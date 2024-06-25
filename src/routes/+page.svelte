<script lang="ts">
	import { page } from "$app/stores";
	import { create } from "../api/users";
	import type { User } from "../types/user";
    import type { BaseForm as BaseFormType } from "../types/form";
    import { fade, fly, slide, scale } from "svelte/transition";
    import BaseForm from "$lib/components/BaseForm.svelte";
    import SetLocation from "$lib/components/SetLocation.svelte";
    import Map from "$lib/components/Map.svelte";
    import Wizard from "$lib/components/Wizard.svelte";
    import type { BaseWizard as BaseWizardType } from "../types/wizard";
    import { transformArrayToObject } from "$lib/utils";
    import { onMount } from "svelte";
	import { commerceJsApiKey } from "../api";
    import ProductCollectionMini from "$lib/components/ProductCollectionMini.svelte";
    import type { ProductCollection as ProductCollectionType } from "../types/product";
	import FunButton from "$lib/components/FunButton.svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";

    let buttonActive = false;
    let errorMessage: string | undefined;
    const accountCreationForm: BaseFormType = {
        title: "create your account",
        fields: [
            { label: "First Name", name: "firstName", value: "", type: "text"},
            { label: "Last Name", name: "lastName", value: "", type: "text"},
            { label: "Email", name: "email", value: "", type: "email"},
            { label: "Password", name: "password", value: "", type: "password"},
            { label: "Date of Birth", name: "birthDate", value: new Date(), type: "date"},
            { label: "I'm signing up as", name: "role", value: "", type: "select", options: [
                { label: "A Buyer", value: "buyer" },
                { label: "A Seller", value: "seller" },
                { label: "An Agent", value: "agent" },
            ]},
        ],
        buttons: [
            { label: "Create account", type: "submit" }
        ],
        otherInnerHTML: [
            "Already have an account? <a href=\"\">Login instead</a>"
        ]
    }
    // https://drive.google.com/file/d/1O8f-bHOIdKoaQpsimfiZXS2MydJXYs8u/view?usp=drive_link
    // https://drive.google.com/file/d/1zrz6a-4VKJfIXhuCbPUwA4X8-xpEHuPr/view?usp=drive_link
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
    
    const productRequestWizard: BaseWizardType = {
        title: "Request a Product",
        description: "Tell us what you want and we will ensure it gets to your doorstep.",
        windows: [
            {
                title: "Basic Product Info",
                description: "Tell us about the product by giving detailed description of it's properties.",
                form: {
                    fields: [
                        {
                            label: "Name",
                            name: "productName",
                            value: "",
                            type: "text",
                            description: "",
                        },
                        {
                            label: "Category",
                            name: "productName",
                            value: "",
                            type: "select",
                            description: "",
                            options: [
                                {
                                    label: "Electronics",
                                    value: "electronics",
                                },
                                {
                                    label: "Clothing, Shoes, Jewelry",
                                    value: "clothing",
                                },
                                {
                                    label: "Home and Kitchen",
                                    value: "home",
                                },
                                {
                                    label: "Books",
                                    value: "books",
                                },
                                {
                                    label: "Pet Supplies",
                                    value: "petSupplies",
                                },
                                {
                                    label: "Sports and Outdoors",
                                    value: "sports",
                                },
                                {
                                    label: "Automotive and Powersport",
                                    value: "automotive",
                                },
                                {
                                    label: "Health and Personal Care",
                                    value: "health",
                                },
                                {
                                    label: "Office Products",
                                    value: "office",
                                },
                            ],
                        },
                        {
                            label: "Condition",
                            name: "condition",
                            value: "",
                            type: "select",
                            description: "",
                            options: [
                                {
                                    label: "Used",
                                    value: "used",
                                },
                                {
                                    label: "Brand new",
                                    value: "new",
                                },
                                {
                                    label: "Refurbished",
                                    value: "refurbished",
                                },
                                {
                                    label: "Faulty",
                                    value: "faulty",
                                },
                            ],
                        },
                        {
                            label: "Description",
                            name: "description",
                            value: "",
                            type: "textarea",
                            description: "Give a brief description of the product",
                        },
                    ]
                },
                action: {
                    name: "",
                    subroutine: () => {}
                }
            },
            {
                title: "Show us the product",
                description: "Take photos and a video of what you would like to sell to help us find you buyers.",
                form: {
                    fields: [
                        {
                            label: "Photos",
                            name: "photos",
                            value: "",
                            type: "file",
                            description: "Upload clear photos of the product from different angles.",
                        },
                        {
                            label: "Video",
                            name: "video",
                            value: "",
                            type: "file",
                            description: "Upload a clear video of the product showing it from as many angles as possible.",
                        },
                    ]
                },
                action: {
                    name: "",
                    subroutine: () => {}
                }
            },
            {
                title: "Product Pricing",
                description: "Tell us how much you would like to sell this product. Remember to choose a fair price!",
                form: {
                    fields: [
                        {
                            label: "Start Price",
                            name: "startPrice",
                            value: "",
                            type: "text"
                        },
                        {
                            label: "Final Price",
                            name: "finalPrice",
                            value: "",
                            type: "text"
                        },
                    ]
                },
                action: {
                    name: "",
                    subroutine: () => {}
                }
            },
            {
                title: "Select Agent",
                description: "Choose who finds you sellers.",
                action: {
                    name: "",
                    subroutine: () => {}
                }
            },

        ]
    }

    const newProducts: ProductCollectionType = {
        name: "New",
        description: "",
        items: [
            {
                name: "iPhone 6",
                startPrice: null,
                finalPrice: 50000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Omen 17",
                startPrice: 450000,
                finalPrice: 300000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7 plus",
                startPrice: null,
                finalPrice: 106000,
                condition: "faulty",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7",
                startPrice: null,
                finalPrice: 96000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Toyota Camry 2014",
                startPrice: 4000000,
                finalPrice: 4165000,
                condition: "refurbished",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Binatone x40 microwave",
                startPrice: null,
                finalPrice: 55000,
                condition: "brand new",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Samsung Galaxy ZFold",
                startPrice: 620000,
                finalPrice: 500000,
                condition: "faulty",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7 plus",
                startPrice: 100000,
                finalPrice: 85000,
                condition: "refurbished",
				description: "Just lorem stuff",
                photos: []
            },
        ]
    }

    const userIntrestProducts: ProductCollectionType = {
        name: "You might be interested in...",
        description: "",
        items: [
            {
                name: "Toyota Corolla 2020",
                startPrice: null,
                finalPrice: 17000000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Play Station 5 pro",
                startPrice: 480000,
                finalPrice: 450000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7 plus",
                startPrice: null,
                finalPrice: 106000,
                condition: "faulty",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7",
                startPrice: null,
                finalPrice: 96000,
                condition: "used",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Toyota Camry 2014",
                startPrice: 4000000,
                finalPrice: 4165000,
                condition: "refurbished",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Binatone x40 microwave",
                startPrice: null,
                finalPrice: 55000,
                condition: "brand new",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "Samsung Galaxy ZFold",
                startPrice: 620000,
                finalPrice: 500000,
                condition: "faulty",
				description: "Just lorem stuff",
                photos: []
            },
            {
                name: "iPhone 7 plus",
                startPrice: 100000,
                finalPrice: 85000,
                condition: "refurbished",
				description: "Just lorem stuff",
                photos: []
            },
        ]
    }

    async function handleSubmit() {
        errorMessage = undefined;

        const user: any = transformArrayToObject(accountCreationForm.fields, "name", "value")
        console.log(user)
        try {
            await create(user)
            if ($page.status === 200) {
                console.log("Sign in successful")
            }
        }
        catch(error: any) {
            errorMessage = error?.message;
            console.log(error)
        }
    }

</script>

<!-- <Wizard
wizardConfig={agentSignUpWizard} /> -->
<!-- <Wizard
wizardConfig={productRequestWizard} /> -->
<section
class="flex flex-col items-center justify-center p-6 w-full space-y-16 h-screen">
Hi there
</section>

MVP frontend breakdown

Wizards:
    Agent Sign Up
    Product Request
    Product Sale

Forms:
    Sign up with basic info
    Log in

Pages:
    Products
    Product
    Agent

MVP shipping deadline July 31st
