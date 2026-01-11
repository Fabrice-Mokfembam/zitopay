"use client";

import { useLanguage } from "@/core/i18n/useLanguage";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (lang: "en" | "fr") => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const getLanguageName = (lang: "en" | "fr") => {
        return lang === "en" ? "English" : "Français";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-colors duration-200 bg-muted border border-border hover:bg-muted/80 text-foreground"
                aria-label="Change language"
            >
                <Globe size={18} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        <button
                            onClick={() => handleLanguageSelect("en")}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === "en"
                                ? "bg-primary-orange text-white"
                                : "text-foreground hover:bg-muted"
                                }`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => handleLanguageSelect("fr")}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === "fr"
                                ? "bg-primary-orange text-white"
                                : "text-foreground hover:bg-muted"
                                }`}
                        >
                            Français
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
