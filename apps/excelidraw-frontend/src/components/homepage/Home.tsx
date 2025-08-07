"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { useDarkMode } from "@/hooks/useDarkMode";
import Header from "@/components/homepage/Header";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import AuthModal from "@/components/homepage/AuthModel";
import CreateRoomModal from "./CreateRoomModel";
import axios from "axios";
import { HTTP_BACKEND } from "@/app/config";
import { redirect } from "next/navigation";

export function Home() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

    const openSignInModal = () => {
        setAuthMode('signin');
        setIsAuthModalOpen(true);
    };

    const openSignUpModal = () => {
        setAuthMode('signup');
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const changeAuthMode = (mode: 'signin' | 'signup') => {
        setAuthMode(mode);
    };
    const openCreateRoomModal = () => {
        setIsCreateRoomModalOpen(true);
    };

    const closeCreateRoomModal = () => {
        setIsCreateRoomModalOpen(false);
    };

    async function createRoom(roomData: { room: string; isPrivate: boolean }) {
        const room = await axios.post(`${HTTP_BACKEND}/room`, roomData, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        console.log(room);
        redirect(`/canvas/${room.data.roomId}`);

        // .then(response => {
        //       redirect(`/canvas/${response.data.roomId}`);
        //     console.log('Success:', response);
        // }).catch(error => {
        //         console.error('Error:', error);
        //     });

          
    }

    const handleCreateRoom = (roomData: { room: string; isPrivate: boolean }) => {
        console.log('Creating room:', roomData);
        // Here you would typically make an API call to create the room
        // For now, we'll just log the data
        createRoom(roomData);



    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
        >
            <Header
                onSignInClick={openSignInModal}
                onSignUpClick={openSignUpModal}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <Hero onGetStartedClick={openSignUpModal}
                onCreateRoomClick={openCreateRoomModal} />
            <Features />
            <Footer />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
                mode={authMode}
                onModeChange={changeAuthMode}
            />
            <CreateRoomModal
                isOpen={isCreateRoomModalOpen} // state
                onClose={closeCreateRoomModal}
                onCreateRoom={handleCreateRoom}
            />
        </motion.div>
    );
}