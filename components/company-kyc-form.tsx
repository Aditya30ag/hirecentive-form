"use client";

import type React from "react";
import { useState } from "react";
import { ArrowRight, Upload, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import ParticleCanvas from "./ParticleCanvas";

export default function DeliveryPartnerKYCForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    panNumber: "",
    aadharNumber: "",
    voterId: "",
    mobileNumber: "",
    email: "",
    address: "",
    state: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    androidPhoneModel: "",
    androidVersion: "",
    vehicleType: "two-wheeler",
    declaration: false,
    date: new Date().toISOString().split("T")[0],
  });

  // Document upload states
  const [panFile, setPanFile] = useState<File | null>(null);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(
    null
  );
  const [registrationFile, setRegistrationFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
  const [bankProofFile, setBankProofFile] = useState<File | null>(null);

  // Verification states
  const [aadharVerified, setAadharVerified] = useState<boolean | null>(null);
  const [aadharError, setAadharError] = useState("");
  const [panVerified, setPanVerified] = useState<boolean | null>(null);
  const [panError, setPanError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "aadharNumber") {
      setAadharVerified(null);
      setAadharError("");
    }

    if (name === "panNumber") {
      setPanVerified(null);
      setPanError("");
    }
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleAadharVerify = () => {
    if (!formData.aadharNumber) {
      setAadharError("Please enter Aadhar number");
      setAadharVerified(false);
      return;
    }

    if (!validateAadhar(formData.aadharNumber)) {
      setAadharError("Please enter a valid 12-digit Aadhar number");
      setAadharVerified(false);
      return;
    }

    // Simulating API verification
    setAadharVerified(true);
    setAadharError("");
  };

  const handlePANVerify = () => {
    if (!formData.panNumber) {
      setPanError("Please enter PAN number");
      setPanVerified(false);
      return;
    }

    if (!validatePAN(formData.panNumber)) {
      setPanError("Please enter a valid PAN format (e.g., ABCDE1234F)");
      setPanVerified(false);
      return;
    }

    // Simulating API verification
    setPanVerified(true);
    setPanError("");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <section className="min-h-screen w-full py-12 px-4 md:px-8 lg:px-24 relative flex items-center justify-center bg-black">
      {/* Background GIF */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-zNzthl4TD9Tu0P4xfUHtXcELWOJNVx.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          animation: "seamlessLoop 8s linear infinite",
        }}
      /> */}
      <ParticleCanvas />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600 via-transparent to-transparent "></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-400 via-transparent to-transparent "></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 rounded-xl blur opacity-25"></div>

        <div className="relative bg-black/50 backdrop-blur-2xl rounded-2xl p-6 md:p-10 border border-slate-800 shadow-2xl shadow-cyan-400/10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center p-2 mb-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
            Swiggy
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
            Delivery Partner Verification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Personal Details
              </p>
              <Input
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />

              {/* PAN Verification */}
              <div className="flex gap-2">
                <Input
                  placeholder="PAN Number"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={handlePANVerify}
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  Verify
                </Button>
              </div>
              {panError && <p className="text-sm text-red-500">{panError}</p>}
              {panVerified && !panError && (
                <p className="text-sm text-emerald-400">
                  PAN Verified Successfully
                </p>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Upload PAN Card"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("panUpload")?.click()}
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="panUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, setPanFile)}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {panFile && (
                <p className="text-sm text-slate-400">File: {panFile.name}</p>
              )}

              {/* ID Verification */}
              <div className="flex gap-2">
                <Input
                  placeholder="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={handleAadharVerify}
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  Verify
                </Button>
              </div>
              {aadharError && (
                <p className="text-sm text-red-500">{aadharError}</p>
              )}
              {aadharVerified && !aadharError && (
                <p className="text-sm text-emerald-400">
                  Aadhar Verified Successfully
                </p>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Upload Aadhar Card"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("addressProofUpload")?.click()
                  }
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="addressProofUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, setAddressProofFile)}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {addressProofFile && (
                <p className="text-sm text-slate-400">
                  File: {addressProofFile.name}
                </p>
              )}

              <Input
                placeholder="Voter ID (Optional if Aadhar provided)"
                name="voterId"
                value={formData.voterId}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />

              <Textarea
                placeholder="Permanent Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />

              <Select
                onValueChange={(value) => handleSelectChange("state", value)}
              >
                <SelectTrigger className="bg-black/60 border-slate-700/50 text-white">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Contact Details
              </p>
              <Input
                placeholder="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Email ID (Optional)"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Bank Account Details
              </p>
              <Input
                placeholder="Bank Account Number"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Upload Bank Proof"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("bankProofUpload")?.click()
                  }
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                  <input
                    id="bankProofUpload"
                    type="file"
                    onChange={(e) => handleFileChange(e, setBankProofFile)}
                    className="hidden"
                    accept="image/*,.pdf"
                  />
                </Button>
                {bankProofFile && (
                  <p className="text-sm text-slate-400">
                    File: {bankProofFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Vehicle Details
              </p>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("vehicleType", value)
                }
                defaultValue="two-wheeler"
              >
                <SelectTrigger className="bg-black/60 border-slate-700/50 text-white">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="scooter">Scooter</SelectItem>
                </SelectContent>
              </Select>

              {/* Driving License */}
              <div className="flex gap-2">
                <Input
                  placeholder="Upload Driving License"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("licenseUpload")?.click()
                  }
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="licenseUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, setDrivingLicenseFile)}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {drivingLicenseFile && (
                <p className="text-sm text-slate-400">
                  File: {drivingLicenseFile.name}
                </p>
              )}

              {/* Registration Certificate */}
              <div className="flex gap-2">
                <Input
                  placeholder="Upload Vehicle RC"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("rcUpload")?.click()}
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="rcUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, setRegistrationFile)}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {registrationFile && (
                <p className="text-sm text-slate-400">
                  File: {registrationFile.name}
                </p>
              )}

              {/* Insurance */}
              <div className="flex gap-2">
                <Input
                  placeholder="Upload Vehicle Insurance"
                  disabled
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("insuranceUpload")?.click()
                  }
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="insuranceUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, setInsuranceFile)}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {insuranceFile && (
                <p className="text-sm text-slate-400">
                  File: {insuranceFile.name}
                </p>
              )}
            </div>

            {/* Phone Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Device Details
              </p>
              <Input
                placeholder="Android Phone Model"
                name="androidPhoneModel"
                value={formData.androidPhoneModel}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Android Version (Must be 4.4.4 or above)"
                name="androidVersion"
                value={formData.androidVersion}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Declaration */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">Declaration</p>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      declaration: checked as boolean,
                    }))
                  }
                  className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-violet-500 border-slate-700"
                />
                <label htmlFor="declaration" className="text-sm text-slate-300">
                  I confirm that the information provided is accurate and
                  complete. I authorize Swiggy to verify all details submitted.
                  I understand that false information may result in rejection of
                  my application.
                </label>
              </div>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full group relative p-3 md:p-4 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 transition-all duration-300 group-hover:blur-md"></div>
              <div className="absolute inset-0.5 bg-black rounded-lg"></div>
              <span className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
                Submit Verification
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes seamlessLoop {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </section>
  );
}
