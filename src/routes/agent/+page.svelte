<script lang="ts">
    import Wizard from "$lib/components/Wizard.svelte";
    import type { BaseWizard as BaseWizardType } from "../../types/wizard";

    const agentSignUpWizard: BaseWizardType = {
        title: "Register as an agent",
        windows: [
            {
                title: "Basic Info",
                description: "Help us identify you",
                form: {
                    fields: [
                        {
                            label: "First Name",
                            name: "firstName",
                            value: "",
                            type: "text",
                            description: ""
                        },
                        {
                            label: "Last Name",
                            name: "lastName",
                            value: "",
                            type: "text",
                            description: ""
                        },
                        {
                            label: "Password",
                            name: "password",
                            value: "",
                            type: "password",
                            description: "Your password should be at least 8 characters long and should contain at least one uppercase letter, one lowercase letter, and one special character."
                        },
                        {
                            label: "Email",
                            name: "email",
                            value: "",
                            type: "email",
                            description: ""
                        },
                        {
                            label: "Date Of Birth",
                            name: "birthDate",
                            value: "",
                            type: "date",
                            description: ""
                        },
                        {
                            label: "Primary Phone Number",
                            name: "phoneNumber",
                            value: "",
                            type: "tel",
                            description: ""
                        },
                    ],
                }
            },
            {
                title: "Confirm your email",
                description: "We have sent a code to the email you entered. Once verified this becomes your primary email",
                form: {
                    fields: [
                        {
                            label: "Enter Verification Code",
                            name: "emailVerificationToken",
                            value: "",
                            type: "text",
                            description: "Do not share this code with anyone."
                        },
                    ]
                }
            },
            {
                title: "Location",
                description: "Your location will help us find buyers and sellers close to you.",
                form: {
                    fields: [
                        {
                            label: "Is this your location?",
                            name: "location",
                            value: "",
                            type: "location",
                            description: "Is this your location?"
                        },
                    ],
                }
            },
            {
                title: "Profile photo upload",
                description: "Upload a photo to serve as your primary display photo. This photo will be visible on your agent's profile page as well as on product cards.",
                form: {
                    fields: [
                        {
                            label: "Profile Photo",
                            name: "profilePhoto",
                            value: "",
                            type: "file",
                            description: "Your photo should clearly show your face and should have a white background."
                        },
                    ]
                }
            },
        ],
    }
</script>

<Wizard
wizardConfig={agentSignUpWizard} />