interface Styling {
    borderRadius: string;
    padding: string;
    width: {
        xs: string;
        sm: string;
        md: string;
    };
}

interface Component {
    type: string;
    format?: string;
    options?: string[];
}

interface Field {
    id: number;
    fieldName: string;
    name: string;
    sequence: number;
    components: Component;
    visible: boolean;
    stylings: Styling;
}

interface FormGroup {
    id: number;
    title: string;
    fields: Field[];
}

const checkOutConfig: FormGroup[] = [
    {
        id: 1,
        title: "Check out",
        fields: [
            {
                id: 1,
                fieldName: "Check-out Date",
                name: "checkoutDate",
                sequence: 1,
                components: {
                    type: "date",
                    format: "YYYY-MM-DD"
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 2,
                fieldName: "Check-out to",
                name: "checkoutTo",
                sequence: 2,
                components: {
                    type: "radio",
                    options: ["Person", "Site / Location"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 3,
                fieldName: "Assign to",
                name: "assignTo",
                sequence: 3,
                components: {
                    type: "select",
                    options: ["Select Person"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 4,
                fieldName: "Due date",
                name: "dueDate",
                sequence: 4,
                components: {
                    type: "date",
                    format: "YYYY-MM-DD"
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 5,
                fieldName: "Site",
                name: "site",
                sequence: 5,
                components: {
                    type: "select",
                    options: ["Select Site"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 6,
                fieldName: "Location",
                name: "location",
                sequence: 6,
                components: {
                    type: "select",
                    options: ["Select Location"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 7,
                fieldName: "Department",
                name: "department",
                sequence: 7,
                components: {
                    type: "select",
                    options: ["Select Department"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 8,
                fieldName: "Check-out Notes",
                name: "checkoutNotes",
                sequence: 8,
                components: {
                    type: "textarea",
                    format: "string"
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 9,
                fieldName: "Send Email",
                name: "sendEmail",
                sequence: 9,
                components: {
                    type: "checkbox",
                    options: ["Send Email"]
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            },
            {
                id: 10,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 10,
                components: {
                    type: "text",
                    format: "string"
                },
                visible: true,
                stylings: {
                    borderRadius: "15px",
                    padding: "12.25px",
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%"
                    }
                }
            }
        ]
    }
];
