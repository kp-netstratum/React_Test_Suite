import { Github } from "./Components/Github";
import { GrafanaJS } from "./Components/Grafana";
import { KafkaJS } from "./Components/Kafka";
import { ZohoBooks } from "./Components/ZohoBooks";
import { ZohoCRM } from "./Components/ZohoCRM";

export const Apps_list = [
    {
        name: "Kafka",
        link: "kafka",
        component: KafkaJS,
    },
    {
        name: "Grafana",
        link: "grafana",
        component: GrafanaJS,
    },
    {
        name: "Prometheus",
        link: "prometheus",
        component: GrafanaJS,
    },
    {
        name: "Docker",
        link: "docker",
        component: GrafanaJS,
    },
    {
        name: "Github",
        link: "github",
        component: Github,
    },
    {
        name: "Zoho Books",
        link: "zoho-books",
        component: ZohoBooks,
    },
    {
        name: "Zoho CRM",
        link: "zoho-crm",
        component: ZohoCRM,
    }
];








