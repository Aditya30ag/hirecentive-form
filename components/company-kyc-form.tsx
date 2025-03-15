"use client";

import type React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowRight, Upload, Check, X, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ParticleCanvas from "./ParticleCanvas";
import FileUpload from "./FIleUploadButton";

export default function DeliveryPartnerKYCForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    panNumber: "",
    aadharNumber: "",
    mobileNumber: "",
    email: "",
    pincode: "",
    state: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    deviceType: "android", // Added deviceType with default value
    androidPhoneModel: "",
    androidVersion: "",
    iosDevice: "", // Added iOS device field
    iosVersion: "", // Added iOS version field
    vehicleType: "two-wheeler",
    declaration: false,
    declaration1: false,
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
  const [showModal, setShowModal] = useState(false);

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

  const handleDeviceTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, deviceType: type }));
  };

  const getVersionInstructions = () => {
    if (formData.deviceType === "android") {
      return "To check your Android version: Go to Settings > About phone > Android version";
    } else {
      return "To check your iOS version: Go to Settings > General > About > Software Version";
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

  // const handleFileChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   setFile: React.Dispatch<React.SetStateAction<File | null>>
  // ) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowModal(true);
  };
  useEffect(() => {
    if (!showModal) return;

    let container = document.getElementById("confetti-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "confetti-container";
      container.className =
        "fixed inset-0 pointer-events-none z-50 overflow-hidden";
      document.body.appendChild(container);
    }

    const createConfetti = () => {
      const shapes = ["circle"];
      const colors = [
        "from-cyan-400 to-violet-500",
        "from-violet-500 to-amber-400",
        "from-amber-400 to-cyan-400",
        "from-pink-400 to-purple-500",
        "from-yellow-400 to-orange-500",
      ];

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        confetti.className = `absolute w-3 h-3 bg-gradient-to-r ${
          colors[Math.floor(Math.random() * colors.length)]
        } ${shape === "circle" ? "rounded-full" : "rounded-sm"}`;

        const startX = Math.random() * 100;
        confetti.style.left = `${startX}vw`;
        confetti.style.top = "-10px";

        const scale = 0.1 + Math.random() * 0.1; // Previous was 0.6 + random * 1.2
        const horizontalDrift = -15 + Math.random() * 30;
        const duration = 5 + Math.random() * 3;
        const delay = Math.random() * 0.01;
        const rotationSpeed = 2 + Math.random() * 5;

        confetti.style.transform = `scale(${scale})`;
        confetti.style.animation = `
          confettiFall ${duration}s ${delay}s ease-in-out forwards,
          confettiDrift ${duration}s ${delay}s ease-in-out infinite alternate,
          confettiRotate ${rotationSpeed}s linear infinite`;

        confetti.style.setProperty("--drift-distance", `${horizontalDrift}px`);

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
      }
    };

    createConfetti();
    let burstCount = 0;
    const maxBursts = 3;
    const interval = setInterval(() => {
      burstCount++;
      createConfetti();
      if (burstCount >= maxBursts) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (container) {
        container.remove();
      }
    };
  }, [showModal]);
  const RenderModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      />

      {/* Confetti container */}

      {/* Modal content */}
      <div className="relative bg-black/80 border border-slate-800 rounded-xl p-6 md:p-8 w-full max-w-md mx-auto shadow-2xl animate-bounce-in">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
          Welcome to Hirecentive Social
        </h3>

        <p className="text-slate-300 text-sm md:text-base mb-6">
          Your journey with Hirecentive Social is set to start really soon!
          We'll be in touch with you shortly to help you get started, after a
          quick verification process!
        </p>

        <button
          onClick={() => setShowModal(false)}
          className="w-full py-2 md:py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
        >
          Got it!
        </button>
      </div>
    </div>
  )
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center p-2 mb-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
            Candidate Verification Form
          </h1>
          <p className="text-center text-lg md:text-lg font-bold text-gray-400 mt-4 max-w-2xl mx-auto mb-4">
            While we try to find a suitable fulltime job matching your skill
            sets, we'll try our best to find you temporary job from our list
            with companies like Grab and Swiggy! *{" "}
          </p>
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

              <FileUpload
                id="panUpload"
                label="Upload PAN Card"
                file={panFile}
                setFile={setPanFile}
              />

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

              <FileUpload
                id="addressProofUpload"
                label="Upload Aadhar Card"
                file={addressProofFile}
                setFile={setAddressProofFile}
              />

              <Input
                type="text"
                placeholder="Enter Pincode"
                name="pincode"
                value={formData.pincode}
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
                placeholder="WhatsApp contact number"
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
              <FileUpload
                id="bankProofUpload"
                label="Upload Bank Proof"
                file={bankProofFile}
                setFile={setBankProofFile}
              />
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
                  <SelectItem value="three-wheeler">Three Wheeler</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                </SelectContent>
              </Select>

              {/* Driving License */}
              <FileUpload
                id="licenseUpload"
                label="Upload Driving License"
                file={drivingLicenseFile}
                setFile={setDrivingLicenseFile}
              />

              <FileUpload
                id="rcUpload"
                label="Upload Vehicle RC"
                file={registrationFile}
                setFile={setRegistrationFile}
              />

              <FileUpload
                id="insuranceUpload"
                label="Upload Vehicle Insurance"
                file={insuranceFile}
                setFile={setInsuranceFile}
              />
            </div>

            {/* Phone Details - UPDATED */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">
                Device Details
              </p>

              {/* Device Type Selection */}
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="android"
                    checked={formData.deviceType === "android"}
                    onCheckedChange={() => handleDeviceTypeChange("android")}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-violet-500 border-slate-700"
                  />
                  <label htmlFor="android" className="text-sm text-slate-300">
                    Android
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ios"
                    checked={formData.deviceType === "ios"}
                    onCheckedChange={() => handleDeviceTypeChange("ios")}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-violet-500 border-slate-700"
                  />
                  <label htmlFor="ios" className="text-sm text-slate-300">
                    Apple iOS
                  </label>
                </div>
              </div>

              {/* Conditional Device Fields */}
              {formData.deviceType === "android" ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Android Phone Model"
                    name="androidPhoneModel"
                    value={formData.androidPhoneModel}
                    onChange={handleInputChange}
                    className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                  />
                  <div className="relative">
                    <Input
                      placeholder="Android Version (Must be 4.4.4 or above)"
                      name="androidVersion"
                      value={formData.androidVersion}
                      onChange={handleInputChange}
                      className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500 pr-10"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Info size={16} className="text-slate-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-black/80 text-white border-slate-700"
                        >
                          <p className="text-sm max-w-xs">
                            {getVersionInstructions()}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    placeholder="Apple Device Model (iPhone, iPad, etc.)"
                    name="iosDevice"
                    value={formData.iosDevice}
                    onChange={handleInputChange}
                    className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                  />
                  <div className="relative">
                    <Input
                      placeholder="iOS Version (Must be 12.0 or above)"
                      name="iosVersion"
                      value={formData.iosVersion}
                      onChange={handleInputChange}
                      className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500 pr-10"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Info size={16} className="text-slate-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-black/80 text-white border-slate-700"
                        >
                          <p className="text-sm max-w-xs">
                            {getVersionInstructions()}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}
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
                  complete. I authorize Hirecentive Network Technologies LLP,
                  and it's clients to verify all details submitted. I understand
                  that false information may result in rejection of my
                  application.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration1}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      declaration1: checked as boolean,
                    }))
                  }
                  className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-violet-500 border-slate-700"
                />
                <label
                  htmlFor="declaration1"
                  className="text-sm text-slate-300"
                >
                  I have read and accept the terms and conditions & security
                  policy and grant permission to use my details only for
                  verification purposes.
                </label>
              </div>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-slate-400"
                min={new Date().toISOString().split("T")[0]} // Restrict to today's date
                max={new Date().toISOString().split("T")[0]} // Restrict to today's date
                readOnly // Prevents manual editing
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
              {/* Modal - Responsive design */}
      {showModal && RenderModal()}
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
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-15px);
          }
        }
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.38, 0.1, 0.36, 1.47) forwards;
        }
      `}</style>
    </section>
  );
}
