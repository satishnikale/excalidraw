import { toast } from 'react-hot-toast';

export const showLoginToast = () =>
    toast.success('Logged in successfully!', {
        duration: 4000,
        position: 'top-center',
    });

export const showAccountCreatedToast = () =>
    toast.success('Account Created successfully!', {
        duration: 4000,
        position: 'top-center',
    });

    export const showSomethinWentWrongToast = () =>
    toast.success('Something Went Wrong!', {
        duration: 4000,
        position: 'top-center',
    });

export const showLogoutToast = () =>
    toast.success('Logged out successfully!', {
        duration: 4000,
        position: 'top-center',
    });

    export const showWrongCreadentialsToast = () =>
    toast.error('Wrong Credentials!', {
        duration: 4000,
        position: 'top-center',
    });

export const showRoomCreatedToast = () =>
    toast.success(`Room created successfully!`, {
        duration: 4000,
        position: 'top-center',
    });
