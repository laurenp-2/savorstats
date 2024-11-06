import Feed from "../pages/Feed";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";

export const PATHS: {
    link: string;
    label: string;
    element?: JSX.Element;
}[] = [
    {
        link: "/feed",
        label: "Feed",
        element: <Feed />,
    },
    {
        link: "/upload",
        label: "Upload",
        element: <Upload />,
    },
    {
        link: "/profile",
        label: "Profile",
        element: <Profile />,
    },
];
