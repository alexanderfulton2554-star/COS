"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check, CircleDashed, Eye, EyeOff, FileText, UploadCloud } from "lucide-react";

type WizardValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  emergencyContact: string;
  employmentRole: string;
  employmentInfo: string;
  declarations: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
  };
};

const wizardSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().min(8, "Phone number is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must include at least one uppercase character.")
      .regex(/[a-z]/, "Password must include at least one lowercase character.")
      .regex(/[0-9]/, "Password must include at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must include at least one special character."),
    confirmPassword: z.string().trim().min(1, "Please confirm your password."),
    dateOfBirth: z.string().min(1, "Date of birth is required."),
    gender: z.string().min(1, "Please select your gender."),
    address: z.string().trim().min(3, "Address is required."),
    city: z.string().trim().min(2, "City is required."),
    postcode: z.string().trim().min(3, "Postcode is required."),
    country: z.string().trim().min(2, "Country is required."),
    emergencyContact: z.string().trim().min(3, "Emergency contact is required."),
    employmentRole: z.string().min(1, "Please select the role you are applying for."),
    employmentInfo: z.string().trim().min(10, "Please tell us more about your employment background and availability."),
    declarations: z.object({
      termsAccepted: z.boolean().refine((value) => value, "Please accept the terms and conditions."),
      privacyAccepted: z.boolean().refine((value) => value, "Please accept the privacy notice."),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const steps = [
  "Account",
  "Personal Details",
  "Employment",
  "Documents",
  "Review",
  "Submitted",
];

const fileCategories = [
  "CV",
  "Right-to-work evidence",
  "DBS certificate",
  "Training certificates",
  "Qualification certificates",
  "Identification/supporting documents",
  "Other supporting documents",
];

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [applicationRef, setApplicationRef] = useState("");
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const form = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      postcode: "",
      country: "United Kingdom",
      emergencyContact: "",
      employmentRole: "Care Worker",
      employmentInfo: "",
      declarations: {
        termsAccepted: false,
        privacyAccepted: false,
      },
    },
  });

  const passwordValue = form.watch("password");
  const passwordChecks = useMemo(
    () => [
      { label: "8+ chars", valid: passwordValue.length >= 8 },
      { label: "Uppercase", valid: /[A-Z]/.test(passwordValue) },
      { label: "Lowercase", valid: /[a-z]/.test(passwordValue) },
      { label: "Number", valid: /[0-9]/.test(passwordValue) },
      { label: "Symbol", valid: /[^A-Za-z0-9]/.test(passwordValue) },
    ],
    [passwordValue]
  );

  const completion = Math.min(((currentStep + 1) / steps.length) * 100, 100);

  const nextStep = async () => {
    const fieldsToValidate: Array<keyof WizardValues> =
      currentStep === 0
        ? ["firstName", "lastName", "email", "phone", "password", "confirmPassword"]
        : currentStep === 1
          ? ["dateOfBirth", "gender", "address", "city", "postcode", "country", "emergencyContact"]
          : currentStep === 2
            ? ["employmentRole", "employmentInfo"]
            : [];

    if (fieldsToValidate.length > 0) {
      const valid = await form.trigger(fieldsToValidate);
      if (!valid) return;
    }

    if (currentStep < steps.length - 2) {
      setCurrentStep((step) => step + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleFileChange = (category: string, file: File | null) => {
    if (!file) return;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG and PNG files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Each document must be 10MB or smaller.");
      return;
    }
    setUploadedFiles((prev) => ({ ...prev, [category]: file }));
  };

  const onSubmit = async () => {
    const valid = await form.trigger();
    if (!valid) return;

    try {
      const payload = {
        ...form.getValues(),
        uploadedFiles: Object.fromEntries(
          Object.entries(uploadedFiles)
            .filter(([, file]) => file)
            .map(([key, file]) => [key, { name: file?.name, size: file?.size, type: file?.type }])
        ),
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed.");
      }

      setApplicationRef(result.applicationRef);
      setCurrentStep(steps.length - 1);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unable to submit registration right now.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">First name</label>
                <input {...form.register("firstName")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="First name" />
                {form.formState.errors.firstName && <p className="mt-1 text-xs text-red-600">{form.formState.errors.firstName.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Last name</label>
                <input {...form.register("lastName")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="Last name" />
                {form.formState.errors.lastName && <p className="mt-1 text-xs text-red-600">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input {...form.register("email")} type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="hello@example.com" />
              {form.formState.errors.email && <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone number</label>
              <input {...form.register("phone")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="+44 7700 900123" />
              {form.formState.errors.phone && <p className="mt-1 text-xs text-red-600">{form.formState.errors.phone.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input {...form.register("password")} type={showPassword ? "text" : "password"} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-slate-900 outline-none focus:border-sky-500" placeholder="Create a password" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.password && <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm password</label>
              <div className="relative">
                <input {...form.register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-slate-900 outline-none focus:border-sky-500" placeholder="Confirm password" />
                <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{form.formState.errors.confirmPassword.message}</p>}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {passwordChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-2 py-1 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full ${check.valid ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span className={check.valid ? "text-emerald-700" : "text-slate-500"}>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Date of birth</label>
                <input {...form.register("dateOfBirth")} type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
                <select {...form.register("gender")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500">
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Address</label>
              <input {...form.register("address")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="Street address" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
                <input {...form.register("city")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="City" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Postcode</label>
                <input {...form.register("postcode")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="Postcode" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
              <input {...form.register("country")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="United Kingdom" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Emergency contact</label>
              <input {...form.register("emergencyContact")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="Name and contact details" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Role applying for</label>
              <select {...form.register("employmentRole")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500">
                <option value="Care Worker">Care Worker</option>
                <option value="Support Worker">Support Worker</option>
                <option value="Registered Manager">Registered Manager</option>
                <option value="Care Manager">Care Manager</option>
                <option value="HR/Admin">HR/Admin</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Employment information</label>
              <textarea {...form.register("employmentInfo")} rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-sky-500" placeholder="Previous employment, start date, availability, visa status, training commitments, etc." />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {fileCategories.map((category) => (
              <div key={category} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800">{category}</p>
                    <p className="text-xs text-slate-500">PDF, JPG or PNG • Max 10MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => inputRefs.current[category]?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <UploadCloud className="h-3.5 w-3.5" /> Choose file
                  </button>
                </div>
                <input
                  ref={(el) => {
                    inputRefs.current[category] = el;
                  }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(event) => handleFileChange(category, event.target.files?.[0] || null)}
                />
                <div className="mt-3 min-h-[48px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                  {uploadedFiles[category] ? (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-sky-600" />
                        <span>{uploadedFiles[category]?.name}</span>
                      </div>
                      <button type="button" onClick={() => setUploadedFiles((prev) => ({ ...prev, [category]: null }))} className="text-xs font-medium text-red-600">Remove</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500">
                      <CircleDashed className="h-4 w-4" />
                      Drag & drop or browse file
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Personal information</h3>
              <p className="text-sm text-slate-600">{form.watch("firstName")} {form.watch("lastName")}</p>
              <p className="text-sm text-slate-600">{form.watch("email")}</p>
              <p className="text-sm text-slate-600">{form.watch("phone")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Employment</h3>
              <p className="text-sm text-slate-600">Role: {form.watch("employmentRole")}</p>
              <p className="text-sm text-slate-600">Details: {form.watch("employmentInfo") || "Not supplied"}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Declarations</h3>
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" {...form.register("declarations.termsAccepted")} className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600" />
                I accept the terms and conditions.
              </label>
              <label className="mt-3 flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" {...form.register("declarations.privacyAccepted")} className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600" />
                I consent to privacy and data processing terms.
              </label>
            </div>
          </div>
        );
      default:
        return (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <Check className="mx-auto h-12 w-12 text-emerald-600" />
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">Registration submitted successfully.</h3>
            <p className="mt-2 text-slate-600">Application reference: {applicationRef}</p>
            <p className="mt-1 text-slate-600">Status: Pending admin review</p>
            <p className="mt-3 text-sm text-slate-600">Please wait for an administrator to accept your application. The $50 registration fee will become available after approval.</p>
            <Link href="/login" className="mt-6 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">Continue to sign in</Link>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Care Organisation System</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Applicant Registration</h1>
            </div>
            <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">{Math.round(completion)}% complete</div>
          </div>
          <div className="mt-5 flex gap-2">
            {steps.slice(0, 5).map((step, index) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full ${index <= currentStep ? "bg-sky-600" : "bg-slate-200"}`} />
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {Math.min(currentStep + 1, steps.length - 1)} of {steps.length - 1}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{steps[currentStep]}</h2>
              </div>
            </div>
            {renderStepContent()}

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {currentStep < steps.length - 2 ? (
                <button type="button" onClick={nextStep} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : currentStep === steps.length - 2 ? (
                <button type="button" onClick={onSubmit} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">Submit for review</button>
              ) : null}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">Application status</h3>
            <div className="mt-5 space-y-4">
              {[
                "Account details",
                "Personal details",
                "Employment",
                "Documents",
                "Review",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full ${index <= currentStep ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {index <= currentStep ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
