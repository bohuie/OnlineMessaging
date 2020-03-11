import { Component, Input, OnInit } from "@angular/core";
import { APIConfig } from "../../shared/app-config";
import { AuthenticationService } from "../../shared/authentication.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "../../shared/common.service";
import { FormValidationService } from "../../shared/form-validation.service";

interface UserObject {
    username: string;
    email: string;
}

interface ProfileObject {
    username: string;
    firstName: string;
    lastName: string;
}

interface UserProfileObject {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

const EMAIL_FORM_NAME = "email";
const LASTNAME_FORM_NAME = "lastName";
const FIRSTNAME_FORM_NAME = "firstName";

const ERROR_MESSAGE = "Your edit was not saved correctly";
const SUCCESS_MESSAGE = "You edit was saved correctly";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
    userProfile: UserProfileObject;
    editForm: FormGroup;

    editing: boolean = false;
    submitAttempt: boolean = false;
    editSaveMessage: string = "";

    private usersAPI = APIConfig.usersAPI;
    private profilesAPI = APIConfig.profilesAPI;

    constructor(
        private auth: AuthenticationService,
        private http: HttpClient,
        private common: CommonService,
        private formValidationService: FormValidationService
    ) {
    }

    private _profileView: string;

    get profileView(): string {
        return this._profileView;
    }

    @Input()
    set profileView(value: string) {
        this.userProfile = null;
        this._profileView = value;
        this.getUserInfo(this._profileView);
    }

    ngOnInit() {
        this.editForm = new FormGroup({
            email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
            firstName: new FormControl(
                "",
                Validators.compose([Validators.required, this.formValidationService.noWhitespaceValidator])
            ),
            lastName: new FormControl(
                "",
                Validators.compose([Validators.required, this.formValidationService.noWhitespaceValidator])
            )
        });
    }

    getUserInfo(username: string): void {
        this.auth.getCurrentSessionId().subscribe(
            (data) => {
                let httpHeaders = {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + data.getJwtToken()
                    })
                };

                this.http.get(this.profilesAPI + username, httpHeaders).subscribe(
                    (data: Array<ProfileObject>) => {
                        let profile: ProfileObject = data[0];
                        this.userProfile = {
                            username: profile.username,
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            email: null
                        };

                        if (username === this.auth.getAuthenticatedUser().getUsername()) {
                            this.http.get(this.usersAPI + username, httpHeaders).subscribe(
                                (data: Array<UserObject>) => {
                                    let user: UserObject = data[0];
                                    if (user) {
                                        this.userProfile.email = user.email;
                                    }
                                },
                                (err) => {
                                    console.log(err);
                                }
                            );
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }

    toggleEditing(editing: boolean) {
        this.editing = editing;
        this.editForm.get(EMAIL_FORM_NAME).setValue(this.userProfile.email);
        this.editForm.get(FIRSTNAME_FORM_NAME).setValue(this.userProfile.firstName);
        this.editForm.get(LASTNAME_FORM_NAME).setValue(this.userProfile.lastName);
    }

    editFormSubmit(form: FormGroup): void {
        this.submitAttempt = true;
        if (this.editForm.valid) {
            this.editUser(form.value.email, form.value.firstName, form.value.lastName);
        }
    }

    editUser(email: string, firstName: string, lastName: string) {
        let username = this.userProfile.username;

        let user: UserObject = {
            username: username,
            email: email
        };

        let profile: ProfileObject = {
            username: username,
            firstName: firstName,
            lastName: lastName
        };

        this.auth.getCurrentSessionId().subscribe(
            (data) => {
                let httpHeaders = {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + data.getJwtToken()
                    })
                };

                this.http.put(this.usersAPI + username, user, httpHeaders).subscribe(
                    () => {
                        this.http.put(this.profilesAPI + username, profile, httpHeaders).subscribe(
                            () => {
                                this.getUserInfo(this.userProfile.username);
                                this.toggleEditing(false);
                                this.editSaveMessage = SUCCESS_MESSAGE;
                            },
                            (err) => {
                                this.editSaveMessage = ERROR_MESSAGE;
                                console.log(err);
                            }
                        );
                    },
                    (err) => {
                        this.editSaveMessage = ERROR_MESSAGE;
                        console.log(err);
                    }
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
