import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("actions/layout.tsx",
        [
            route("encode", "actions/encode.tsx"),
            route("decode", "actions/decode.tsx"),

        ]
    )
] satisfies RouteConfig;
