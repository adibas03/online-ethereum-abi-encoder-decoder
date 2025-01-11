import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";
import PackageJson from "../package.json"

export default [
    ...prefix(PackageJson.name, [
        index("routes/home.tsx"),
        layout("actions/layout.tsx",
            [
                route("encode", "actions/encode.tsx"),
                route("decode", "actions/decode.tsx"),

            ]
        )]),
    route("/*", "routes/404.tsx")
] satisfies RouteConfig;
