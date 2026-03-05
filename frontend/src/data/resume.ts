export const experience = [
    {
        company: "Persistent Systems",
        role: "Lead Software Developer",
        period: "Oct 2024 – Present",
        location: "Bengaluru, India",
        clients: [
            {
                name: "Vuclip (OTT Platform)",
                period: "Mar 2025 – Present",
                points: [
                    "Own multiple Go-based microservices handling retail provisioning and subscription lifecycle management at scale for Vuclip's B2B OTT platform.",
                    "Designed and implemented a Semi-Managed Subscription system — automates deactivation, suspension, and resumption of subscriptions based on per-partner business config, reducing manual intervention across Vuclip's client base.",
                    "Extended retail provisioning APIs to support full activation/deactivation/resumption flows, enabling partners to seamlessly manage end-user subscriptions.",
                    "Drove migration of legacy Java subscription services to Go — improved performance, reduced complexity, and aligned with the team's Go-first microservice strategy.",
                    "Led end-to-end testing across staging and QA; coordinated production rollout of semi-managed subscriptions with zero critical post-release incidents.",
                    "Proactively identified and resolved security vulnerabilities across multiple repositories as part of a vulnerability remediation initiative.",
                ],
            },
            {
                name: "NewRelic (Developer Platform)",
                period: "Nov 2024 – Feb 2025",
                points: [
                    "Built CI/CD pipeline infrastructure for the NewRelic product suite.",
                    "Implemented an automated system to scan and rebuild Docker images using Trivy, reducing manual intervention in vulnerability management and improving deployment pipeline security.",
                ],
            },
        ],
        tags: ["Go", "microservices", "REST APIs", "CI/CD", "AWS", "Docker", "GitHub Enterprise"],
    },
    {
        company: "CSG",
        role: "Senior Software Development Engineer",
        period: "Dec 2023 – Oct 2024",
        location: "Bengaluru, India",
        clients: [
            {
                name: "",
                period: "",
                points: [
                    "Led design and development of Go microservices for scalable backend solutions across the CSG product suite.",
                    "Designed and implemented payment and reservations for the Charging System Orchestration (CSO) microservice — integrated multiple repositories and services through REST APIs, coordinating across the full payment and reservation lifecycle.",
                    "Ensured seamless communication, scalability, and reliability across payment flows serving telecom billing infrastructure.",
                ],
            },
        ],
        tags: ["Go", "microservices", "REST APIs", "AWS"],
    },
    {
        company: "MachaniRobotics",
        role: "Software Developer – Robotics & AI",
        period: "Jan 2021 – Dec 2023",
        location: "Bengaluru, India",
        clients: [
            {
                name: "Genesis Engine",
                period: "",
                points: [
                    "Orchestrated the shift from a monolithic to a dockerized mono-repo architecture in Genesis (the core engine), leveraging Docker and CI/CD — significantly reducing production time and improving micro-service efficiency.",
                    "Engineered Gaia — a Go gateway microservice using gRPC, GraphQL, and Protocol Buffers for streamlined authentication and request routing. Integrated Nginx and Envoy Gateway as reverse proxies, enabling precise control and efficient orchestration across all Genesis microservices.",
                    "Built ApexDrive — a C++ microservice acting as a centralized Limb Driver for a humanoid robot, controlling all limbs within the hardware stack. Enabled lifelike motion dynamics and precise animation, significantly advancing the robot's physical interaction capabilities.",
                    "Built Portail — a GraphQL API gateway microservice to streamline request delegation, improving system performance and operational scalability.",
                    "Enhanced the Facial Recognition perception pipeline — managed embeddings and image augmentations, improving recognition accuracy in challenging environments.",
                    "Integrated ChatGPT APIs to build an interactive chatbot for the humanoid robot with TTS and STT capabilities, enabling natural human–robot communication.",
                ],
            },
        ],
        tags: ["Go", "C++", "gRPC", "GraphQL", "Protobuf", "Envoy", "Nginx", "Docker", "bazel"],
    },
    {
        company: "Oracle",
        role: "Software Developer (System)",
        period: "Jul 2018 – Dec 2020",
        location: "Bengaluru, India",
        clients: [
            {
                name: "vSTP – Virtual Signaling Transfer Point",
                period: "",
                points: [
                    "Developed key features for the SIGTRAN SCCP Layer within the vSTP, improving protocol efficacy and communications reliability within 3G network infrastructure.",
                    "Implemented a packet segmentation mechanism for large data loads — significantly improved transmission efficiency and reduced transmission errors across the signaling network.",
                    "Designed a Firewall Management Process to allow only provisioned connections, enhancing system security and minimizing unauthorized access risks.",
                    "Automated test suite creation with Python, improving code coverage and contributing to higher code quality across the vSTP codebase.",
                ],
            },
        ],
        tags: ["C++", "Python", "SIGTRAN", "systems programming", "3G"],
    },
];

export const skills = [
    { category: "Primary", items: ["Go", "C++"] },
    { category: "Backend", items: ["gRPC", "REST APIs", "GraphQL", "Protocol Buffers", "Gin"] },
    { category: "Databases", items: ["PostgreSQL", "SQLC"] },
    { category: "Infrastructure", items: ["Docker", "Nginx", "Envoy", "AWS", "CI/CD"] },
    { category: "Previously", items: ["Python", "Java", "JavaScript", "Bazel"] },
];

export const education = [
    {
        degree: "M.Sc Computer Science",
        institution: "Amrita University",
        period: "2016 – 2018",
        location: "Coimbatore, TN",
        cgpa: "8.0",
    },
    {
        degree: "Diploma in Java",
        institution: "NIIT",
        period: "2013 – 2014",
        location: "Bengaluru, KA",
        cgpa: "7.0",
    },
    {
        degree: "B.E Electrical & Electronics",
        institution: "Vinayaka University",
        period: "2009 – 2013",
        location: "Salem, TN",
        cgpa: "6.5",
    },
];
