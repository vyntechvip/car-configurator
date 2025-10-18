"use client";

import { useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Cars from "../components/CarModel";

export default function Configurator() {
  const [activeTab, setActiveTab] = useState("Exterior");
  const [color, setColor] = useState("#9EA0A3");
  const [wheel, setWheel] = useState("20'' 5-Spoke Gloss Black");
  const [interior, setInterior] = useState("Black Alcantara");
  const [background, setBackground] = useState("studio");
  const [is3DView, setIs3DView] = useState(false);
  const[currentImage,setCurrentImage]=useState(0);
  const colors = [
    { name: "Nardo Grey", hex: "#9EA0A3", price: "Included" },
    { name: "Mythos Black metallic", hex: "#0B0C0E", price: "+$595" },
    { name: "Glacier White metallic", hex: "#F2F2F2", price: "+$595" },
    { name: "Ascari Blue metallic", hex: "#376282", price: "+$595" },
    { name: "Florett Silver metallic", hex: "#B6B6B6", price: "+$595" },
  ];
// Add these to your existing state
const [interiorColor, setInteriorColor] = useState("#1a1a1a"); // Default black interior
const [trimColor, setTrimColor] = useState("#c0c0c0"); // Default aluminum trim

// Update your Canvas component to pass interior colors:


// Add this color-to-image mapping function
const getColorImages = (currentColor) => {
  const colorMap = {
    "#9EA0A3": [ // Nardo Grey
      "/images/all.png",
      "/images/front.png",
      "/images/right.png",
      "/images/back.png",

     
    ],
    "#0B0C0E": [ // Mythos Black
      "/images/cars/black/all.png",
     /* "/images/cars/black/front.png",
      "/images/cars/black/right.png", 
      "/images/cars/black/back.png"*/
    ],
   /* "#F2F2F2": [ // Glacier White
      "/images/cars/white/all.png",
      "/images/cars/white/front.png",
      "/images/cars/white/right.png",
      "/images/cars/white/back.png"
    ],*/
    "#376282": [ // Ascari Blue
      "/images/cars/blue/all.png", 
     
    ],
    "#B6B6B6": [ // Florett Silver
      "/images/cars/silver/all.png",
      
    ]
  };
  
  return colorMap[currentColor] || colorMap["#9EA0A3"]; // Default to grey
};

// Use it in your component
const carImages = getColorImages(color);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % carImages.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));

  const wheels = [
    "20'' 5-Spoke Gloss Black",
    "21'' Twin-Spoke Titanium",
    "22'' Performance Silver",
  ];

  const interiors = ["Black Alcantara", "Red Leather Sport", "Beige Luxury Trim"];

  // Add these states to your component
const [selectedPackages, setSelectedPackages] = useState([]);
const [showPackagePopup, setShowPackagePopup] = useState(false);
const [lastAddedPackage, setLastAddedPackage] = useState(null);

// Handle package selection
const handlePackageSelect = (packageName, packagePrice, packageFeatures) => {
  setSelectedPackages(prev => {
    const isSelected = prev.some(pkg => pkg.name === packageName);
    
    if (isSelected) {
      // Remove package and revert changes
      applyPackageFeatures(packageName, false);
      return prev.filter(pkg => pkg.name !== packageName);
    } else {
      // Add package and apply features
      const newPackage = { name: packageName, price: packagePrice, features: packageFeatures };
      applyPackageFeatures(packageName, true);
      setLastAddedPackage(newPackage);
      setShowPackagePopup(true);
      return [...prev, newPackage];
    }
  });
};

// Apply package features to the car model
const applyPackageFeatures = (packageName, isAdding) => {
  switch (packageName) {
    case "Black Optic Package":
      if (isAdding) {
        // Apply black optic features
        setColor("#0B0C0E"); // Change to black
        //setWheelColor("#222222"); // Black wheels
        setInteriorColor("#1a1a1a"); // Black interior
        // You might want to add more specific changes here
      } else {
        // Revert to default colors
        setColor("#9EA0A3"); // Default grey
      //  setWheelColor("#333333"); // Default wheel color
        setInteriorColor("#1a1a1a"); // Keep or revert interior
      }
      break;
      
    case "Performance Package":
      if (isAdding) {
        // Apply performance features
      //  setWheelColor("#555555"); // Sporty wheel color
        // Add other performance visual changes
      }
      break;
      
    case "Luxury Package":
      if (isAdding) {
        // Apply luxury features
        setInteriorColor("#8B4513"); // Brown leather
        setTrimColor("#8B4513"); // Wood trim
      }
      break;
      
    default:
      break;
  }
};
// Add this state to track selected packages

// Then update the buttons in the Packages section:

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between bg-neutral-800 p-4 border-b border-neutral-700">
        <div className="text-lg font-semibold flex items-center gap-2">
          <span className="font-bold text-xl">logo</span>
          <span>2026 Audi RS7 Configurator</span>
        </div>
        <div className="flex gap-3">
          <button className="bg-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-600">
            Save Configuration
          </button>
          <button className="bg-black px-4 py-2  hover:bg-gray-500">
            Share
          </button>
          <button className="bg-gray-600 px-4 py-2 hover:bg-black">
            Download PDF
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side: Car preview */}
        <div className="flex-1 flex items-center justify-center relative bg-neutral-900">
          {!is3DView ? (
             <Canvas
             shadows
             camera={{ position: [2, 2, 5], fov: 60 }}
             gl={{
               preserveDrawingBuffer: true,
               toneMapping: THREE.ACESFilmicToneMapping,
               outputColorSpace: THREE.SRGBColorSpace,
             }}
           >
             <color  />
             <ambientLight intensity={1} />
             <directionalLight position={[4, 4, 3]} intensity={1.5} />
             <Cars 
  color={color} 
 // wheelColor={wheelColor} 
  interiorColor={interiorColor}
  trimColor={trimColor}
/>
             <OrbitControls enablePan={false} />
             <Environment preset="sunset" />
           </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
            <img
              src={carImages[currentImage]}
              alt={`Audi RS7 in ${colors.find(c => c.hex === color)?.name} - View ${currentImage + 1}`}
              className="w-[90%] h-[85%] object-contain shadow-lg transition-all duration-500"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.target.src = "/images/cars/grey/all.png";
              }}
            />
        
            <div className="absolute bottom-8 right-6 flex space-x-2">
              <button
                onClick={prevImage}
                className="bg-white border px-3 py-2 rounded-md text-black shadow-sm hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="bg-white border px-3 py-2 rounded-md text-black shadow-sm hover:bg-gray-100"
              >
                →
              </button>
            </div>
        
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentImage ? "bg-white" : "bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        )}
          <div className="absolute bottom-4 left-6 z-10">
            <button
              onClick={() => setIs3DView(!is3DView)}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              {is3DView ?  "Show 3D View" :"Show Images" }
            </button>
          </div>
        </div>

        {/* Right side: Configurator panel */}
        <div className="w-96 bg-neutral-50 text-black p-5 overflow-y-auto max-h-screen">
          {/* Tabs */}
          <div className="flex gap-3 mb-6 border-b border-gray-300 pb-3">
            {["Exterior", "Wheels", "Interior", "Packages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 border border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        {/* Tab Content */}
{activeTab === "Exterior" && (
  <div>
    <h2 className="text-lg font-semibold mb-3">Exterior Colors</h2>

    {/* Solid Finishes */}
    <p className="font-medium text-gray-700 mb-2">Solid Finishes</p>
    <button
      onClick={() => setColor("#9EA0A3")}
      className={`flex items-center justify-between p-3 rounded-lg border mb-3 ${
        color === "#9EA0A3"
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded-full border border-gray-400"
          style={{ backgroundColor: "#9EA0A3" }}
        ></div>
        <span>Nardo Grey</span>
      </div>
      <span className="text-sm text-gray-500">Included</span>
    </button>

    {/* Metallic Paint Finishes */}
    <p className="font-medium text-gray-700 mb-2">
      Metallic Paint Finishes
    </p>

    <div className="grid grid-cols-2 gap-3 mb-6">
      {colors.slice(1).map((c) => (
        <button
          key={c.name}
          onClick={() => setColor(c.hex)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
            color === c.hex
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <div
            className="w-8 h-8 rounded-full border border-gray-400 mb-2"
            style={{ backgroundColor: c.hex }}
          ></div>
          <span className="text-sm text-center">{c.name}</span>
          <span className="text-xs text-gray-500">{c.price}</span>
        </button>
      ))}
    </div>

    {/* Dashboard & Trim */}
    <h3 className="font-medium text-gray-700 mb-2">Accessories</h3>
    <div className="grid grid-cols-2 gap-3">
      {[
        {
          name: "Carbon Fiber",
          price: "+$2,500",
          color: "bg-gradient-to-br from-gray-800 to-gray-600",
          trimColor: "#2a2a2a",
        },
        {
          name: "Wood Finish",
          price: "+$1,800",
          color: "bg-gradient-to-br from-amber-800 to-amber-600",
          trimColor: "#8B4513",
        },
        {
          name: "Brushed Aluminum",
          price: "Included",
          color: "bg-gradient-to-br from-gray-300 to-gray-100",
          trimColor: "#c0c0c0",
        },
        {
          name: "Black Piano",
          price: "+$1,200",
          color: "bg-gradient-to-br from-gray-900 to-gray-700",
          trimColor: "#1a1a1a",
        },
      ].map((trim, index) => (
        <button
          key={index}
          onClick={() => setTrimColor(trim.trimColor)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
            trimColor === trim.trimColor
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <div className={`w-12 h-12 rounded-lg mb-2 ${trim.color}`}></div>
          <span className="text-sm text-center font-medium">{trim.name}</span>
          <span className="text-xs text-gray-500">{trim.price}</span>
        </button>
      ))}
    </div>
  </div>
)}


{activeTab === "Wheels" && (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Wheels</h2>

    {/* 21" Category */}
    <h3 className="text-lg font-medium mb-2">21"</h3>
    <div className="flex flex-col gap-3 mb-6">
      {[
        {
          name: '21" 10-spoke star design',
          finish: "Silver finish",
          price: "Standard",
          img: "/images/wheels/silver.png",
        },
      ].map((wheelItem, index) => (
        <button
          key={index}
          onClick={() => setWheel(wheelItem.name)}
          className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
            wheel === wheelItem.name
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <img
            src={wheelItem.img}
            alt={wheelItem.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold">{wheelItem.name}</h4>
            <p className="text-sm text-gray-600">{wheelItem.finish}</p>
            <p className="text-sm text-gray-800 font-medium">{wheelItem.price}</p>
          </div>
        </button>
      ))}
    </div>

    {/* 22" Category */}
    <h3 className="text-lg font-medium mb-2">22"</h3>
    <div className="flex flex-col gap-3">
      {[
        {
          name: '22" 5-Y-spoke design',
          finish: "Matte Grey finish",
          price: "+$2,500",
          img: "/images/wheels/black.png",
        },
        {
          name: '22" 5-Y-spoke design',
          finish: "Bicolor finish",
          price: "+$3,550",
          img: "/images/wheels/silver.png",
        },
      ].map((wheelItem, index) => (
        <button
          key={index}
          onClick={() => setWheel(wheelItem.name)}
          className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
            wheel === wheelItem.name
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <img
            src={wheelItem.img}
            alt={wheelItem.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold">{wheelItem.name}</h4>
            <p className="text-sm text-gray-600">{wheelItem.finish}</p>
            <p className="text-sm text-gray-800 font-medium">{wheelItem.price}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
)}

{activeTab === "Interior" && (
  <div>
    <h2 className="text-lg font-semibold mb-3">Interior Colors</h2>
    
    {/* Seats */}
    <h3 className="font-medium text-gray-700 mb-2">Seat Upholstery</h3>
    <div className="flex flex-col gap-3 mb-6">
      {[
        {
          name: "Black Leather",
          desc: "Premium black leather seats",
          price: "Included",
          color: "bg-gray-900",
          interiorColor: "#1a1a1a"
        },
        {
          name: "Cognac Brown",
          desc: "Luxury brown leather",
          price: "+$1,500",
          color: "bg-amber-900",
          interiorColor: "#8B4513"
        },
       
        {
          name: "Beige Luxury",
          desc: "Premium beige leather interior",
          price: "+$1,800",
          color: "bg-amber-100",
          interiorColor: "#F5F5DC"
        },
      ].map((interiorItem, index) => (
        <button
          key={index}
          onClick={() => setInteriorColor(interiorItem.interiorColor)}
          className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
            interiorColor === interiorItem.interiorColor
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full border border-gray-300 ${interiorItem.color}`}
          ></div>
          <div className="flex-1">
            <h4 className="font-semibold">{interiorItem.name}</h4>
            <p className="text-sm text-gray-600">{interiorItem.desc}</p>
            <p className="text-sm text-gray-800 font-medium">{interiorItem.price}</p>
          </div>
        </button>
      ))}
    </div>
</div>
)}
    

    {activeTab === "Packages" && (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-2">Optional Packages</h2>
    <p className="text-gray-600 mb-6">
      Enhance your RS7 with carefully curated packages that combine multiple features for added value.
    </p>

    {/* Black Optic Package */}
    <div className="border border-gray-300 rounded-lg p-5 mb-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">Black Optic Package</h3>
        <span className="text-lg font-bold text-gray-900">+$3,550</span>
      </div>
      
      <p className="text-gray-700 mb-4">
        Black exterior styling elements, black mirror caps, black window trim
      </p>
      
      <div className="mb-4">
        <p className="text-gray-800 font-medium mb-2">Includes:</p>
        <ul className="space-y-1">
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Black exterior mirror housings
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Black window trim
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Black grille elements
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            22" wheels with bicolor finish
          </li>
        </ul>
      </div>
      
      <button 
        onClick={() => handlePackageSelect(
          "Black Optic Package", 
          3550,
          {
            exteriorColor: "#0B0C0E",
            wheelColor: "#222222",
            interiorColor: "#1a1a1a",
            features: ["Black exterior", "Black wheels", "Black interior"]
          }
        )}
        className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
          selectedPackages.some(pkg => pkg.name === "Black Optic Package")
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-black text-white hover:bg-gray-700"
        }`}
      >
        {selectedPackages.some(pkg => pkg.name === "Black Optic Package")
          ? "Package Added ✓"
          : "Add Package"}
      </button>
    </div>

    {/* Performance Package */}
    <div className="border border-gray-300 rounded-lg p-5 mb-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">Performance Package</h3>
        <span className="text-lg font-bold text-gray-900">+$6,500</span>
      </div>
      
      <p className="text-gray-700 mb-4">
        Enhanced performance features and sport tuning
      </p>
      
      <div className="mb-4">
        <p className="text-gray-800 font-medium mb-2">Includes:</p>
        <ul className="space-y-1">
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Sport-tuned suspension
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Performance exhaust system
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Sport+ driving mode
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Carbon fiber interior trim
          </li>
        </ul>
      </div>
      
      <button 
        onClick={() => handlePackageSelect(
          "Performance Package", 
          6500,
          {
            wheelColor: "#555555",
            trimColor: "#2a2a2a",
            features: ["Sport wheels", "Carbon fiber trim"]
          }
        )}
        className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
          selectedPackages.some(pkg => pkg.name === "Performance Package")
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-black text-white hover:bg-gray-700"
        }`}
      >
        {selectedPackages.some(pkg => pkg.name === "Performance Package")
          ? "Package Added ✓"
          : "Add Package"}
      </button>
    </div>

    {/* Luxury Package */}
    <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">Luxury Package</h3>
        <span className="text-lg font-bold text-gray-900">+$4,200</span>
      </div>
      
      <p className="text-gray-700 mb-4">
        Premium comfort and luxury features
      </p>
      
      <div className="mb-4">
        <p className="text-gray-800 font-medium mb-2">Includes:</p>
        <ul className="space-y-1">
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Heated and ventilated seats
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Premium sound system
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Ambient lighting
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            Advanced climate control
          </li>
        </ul>
      </div>
      
      <button 
        onClick={() => handlePackageSelect(
          "Luxury Package", 
          4200,
          {
            interiorColor: "#8B4513",
            trimColor: "#8B4513",
            features: ["Brown leather", "Wood trim"]
          }
        )}
        className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
          selectedPackages.some(pkg => pkg.name === "Luxury Package")
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-black text-white hover:bg-gray-700"
        }`}
      >
        {selectedPackages.some(pkg => pkg.name === "Luxury Package")
          ? "Package Added ✓"
          : "Add Package"}
      </button>
    </div>
  </div>
)}

          {/* Bottom info */}
          <div className="mt-8 border-t border-gray-300 pt-4">
            <p className="text-lg font-semibold">2026 Audi RS7 Performance</p>
            <p className="text-sm text-gray-500">quattro® tiptronic®</p>
            <p className="mt-2 text-2xl font-bold">$133,995</p>
          </div>

          <div className="mt-6 flex gap-3 pb-6">
            <button className="bg-black flex-1 py-2  text-white hover:bg-gray-500">
              Build & Price
            </button>
            <button className="bg-black flex-1 py-2  text-white hover:bg-gray-500">
              Find Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
