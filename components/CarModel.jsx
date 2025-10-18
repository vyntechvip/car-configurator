"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Cars({ color, wheelColor = "#333333", interiorColor = "#1a1a1a", trimColor = "#c0c0c0" }) {
  const { scene } = useGLTF("/models/car.glb");

  useEffect(() => {
    const newColor = new THREE.Color(color);
    const newWheelColor = new THREE.Color(wheelColor);
    const newInteriorColor = new THREE.Color(interiorColor);
    const newTrimColor = new THREE.Color(trimColor);
    
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materialName = child.material.name.toLowerCase();
        const meshName = child.name.toLowerCase();

        // Check if this is a wheel/rim part
        const isWheelPart = 
          materialName.includes('wheel') ||
          materialName.includes('rim') ||
          materialName.includes('alloy') ||
          meshName.includes('wheel') ||
          meshName.includes('rim') ||
          meshName.includes('alloy');

        // Check if this is a tire/rubber part
        const isTirePart =
          materialName.includes('tire') ||
          materialName.includes('rubber') ||
          meshName.includes('tire') ||
          meshName.includes('rubber');

        // Check if this is an interior part (seats, dashboard, etc.)
        const isInteriorPart =
          materialName.includes('interior') ||
          materialName.includes('seat') ||
          materialName.includes('dashboard') ||
          materialName.includes('steering') ||
          materialName.includes('console') ||
          materialName.includes('doorpanel') ||
          meshName.includes('interior') ||
          meshName.includes('seat') ||
          meshName.includes('dashboard') ||
          meshName.includes('steering') ||
          meshName.includes('console') ||
          meshName.includes('door');

        // Check if this is a trim part
        const isTrimPart =
          materialName.includes('trim') ||
          materialName.includes('carbon') ||
          materialName.includes('wood') ||
          materialName.includes('aluminum') ||
          materialName.includes('piano') ||
          meshName.includes('trim') ||
          meshName.includes('accent');

        // Parts to always exclude from any color changes
        const isExcluded = 
          materialName.includes('glass') ||
          materialName.includes('window') ||
          materialName.includes('light') ||
          materialName.includes('lamp') ||
          materialName.includes('headlight') ||
          materialName.includes('taillight') ||
          materialName.includes('black') ||
          materialName.includes('chrome') ||
          materialName.includes('logo') ||
          materialName.includes('badge') ||
          materialName.includes('grille') ||
          isTirePart; // Keep tires black

        // Apply wheel color to wheel parts
        if (isWheelPart) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.color) {
                mat.color.set(newWheelColor);
              }
            });
          } else {
            if (child.material.color) {
              child.material.color.set(newWheelColor);
            }
          }
        }
        // Apply interior color to interior parts
        else if (isInteriorPart && !isExcluded) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.color) {
                mat.color.set(newInteriorColor);
              }
            });
          } else {
            if (child.material.color) {
              child.material.color.set(newInteriorColor);
            }
          }
        }
        // Apply trim color to trim parts
        else if (isTrimPart && !isExcluded) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.color) {
                mat.color.set(newTrimColor);
              }
            });
          } else {
            if (child.material.color) {
              child.material.color.set(newTrimColor);
            }
          }
        }
        // Apply body color to non-excluded, non-special parts
        else if (!isExcluded && !isWheelPart && !isInteriorPart && !isTrimPart) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.color) {
                mat.color.set(newColor);
              }
            });
          } else {
            if (child.material.color) {
              child.material.color.set(newColor);
            }
          }
        }
      }
    });
  }, [scene, color, wheelColor, interiorColor, trimColor]);

  return (
    <primitive 
      object={scene} 
      scale={0.75} 
      position={[0, -1, 0]} 
      rotation={[0, Math.PI, 0]} 
    />
  );
}

useGLTF.preload("/models/car.glb");