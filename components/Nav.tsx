"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/core/i18n/useTranslation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
    const { t } = useTranslation("nav");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link 
                        href="/" 
                        className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-2"
                        onClick={closeMenu}
                    >
                        <span className="w-3 h-3 rounded" style={{ backgroundColor: '#2466eb' }}></span>
                        ZitoPay
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/#how-it-works" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                            {t("howItWorks")}
                        </Link>
                        <Link href="/developers" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                            {t("developers")}
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                            {t("pricing")}
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                            {t("contact")}
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                            {t("about")}
                        </Link>
                    </div>

                    {/* Right Side - Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <Link
                            href="/login"
                            className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                        >
                            {t("login")}
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            style={{ backgroundColor: '#ef2d10' }}
                        >
                            {t("signUp")}
                        </Link>
                    </div>

                    {/* Mobile - Toggles and Hamburger */}
                    <div className="flex lg:hidden items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Slide from top */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="pb-4 pt-2 space-y-4 border-t border-border mt-2">
                                <Link
                                    href="/#how-it-works"
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                >
                                    {t("howItWorks")}
                                </Link>
                                <Link
                                    href="/developers"
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                >
                                    {t("developers")}
                                </Link>
                                <Link
                                    href="/pricing"
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                >
                                    {t("pricing")}
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                >
                                    {t("contact")}
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={closeMenu}
                                    className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                >
                                    {t("about")}
                                </Link>
                                <div className="pt-4 border-t border-border space-y-3">
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="block py-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                                    >
                                        {t("login")}
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className="block w-full text-center px-5 py-2.5 rounded-lg text-white font-semibold text-sm shadow-lg transition-all"
                                        style={{ backgroundColor: '#ef2d10' }}
                                    >
                                        {t("signUp")}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
