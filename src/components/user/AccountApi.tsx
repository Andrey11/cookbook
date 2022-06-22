import Firebase from "../firebase/Firebase";

export const updateUserData = (userId: string, userData: any) => {
    const fb = Firebase.getInstance();
    return fb.doUpdateUserInfo(userId, userData);
};

export const loadUserData = (userId: string) => {
    const fb = Firebase.getInstance();
    return fb.doLoadUserById(userId);
};

export const getAvatar = (avatarPath: string) => {
    const fb = Firebase.getInstance();
    return fb.doGetAvatarImageById(avatarPath);
};

export const setAvatar = (userId: string, file: any) => {
    const fb = Firebase.getInstance();
    return fb.doUploadAvatar(userId, file);
};