// noinspection SpellCheckingInspection
import { HttpHeaders } from "@angular/common/http";

export const CognitoConfig = {
    UserPoolId: "ca-central-1_6ickHVand",
    ClientId: "2n7od4b3prkjdc9trthuf3d92q"
};

export const APIConfig = {
    usersAPI: "http://localhost:8080/users/",
    messagesAPI: "http://localhost:8080/messages/",
    channelsAPI: "http://localhost:8080/channels/",
    profilesAPI: "http://localhost:8080/profiles/",
    notificationsAPI: "http://localhost:8080/notifications/"
};

export const Constants = {
    LOGIN_ROUTE: "/login",
    REGISTER_ROUTE: "/register",
    HOME_ROUTE: "/",
    SLASH: "/",
    USERNAME: "username",
    PASSWORD: "password",
    EMPTY: "",
    USERS_PATH: "/users",
    CHANNELS_PATH: "/channels",
    HTTP_OPTIONS: {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }
};

export const VALIDATION_MESSAGES = {
    username: [
        { type: "required", message: "Username is required" },
        {
            type: "alreadyTaken",
            message: "Your username has already been taken"
        },
        {
            type: "pattern",
            message: "Username must not contain whitespace"
        },
        {
            type: "maxlength",
            message: "Username cannot be more than 30 characters"
        },
        {
            type: "invalidLogin",
            message: "Username or password is incorrect, please try again."
        },
        {
            type: "badWord",
            message: "Username cannot contain swears"
        }
    ],
    email: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Invalid email" }
    ],
    password: [
        { type: "required", message: "Password is required" },
        {
            type: "minlength",
            message: "Password must be at least 8 characters long"
        }
    ],
    confirmPassword: [
        { type: "required", message: "Please confirm your password" },
        { type: "misMatch", message: "Passwords do not match" }
    ],
    firstName: [
        { type: "required", message: "First name is required" },
        {
            type: "pattern",
            message: "First name must not contain whitespace"
        },
        {
            type: "maxlength",
            message: "First name cannot be more than 30 characters"
        },
        {
            type: "badWord",
            message: "First name cannot contain swears"
        }
    ],
    lastName: [
        { type: "required", message: "Last Name is required" },
        {
            type: "pattern",
            message: "Last Name must not contain whitespace"
        },
        {
            type: "maxlength",
            message: "Last name cannot be more than 30 characters"
        },
        {
            type: "badWord",
            message: "Last name cannot contain swears"
        }
    ],
    channelName: [
        { type: "required", message: "Channel name is required" },
        {
            type: "maxlength",
            message: "Channel name cannot be more than 30 characters"
        },
        {
            type: "badWord",
            message: "Channel name cannot contain swears"
        }
    ],
    channelType: [{ type: "required", message: "Channel type is required" }]
};
