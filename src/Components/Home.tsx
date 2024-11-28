import { Apps_list } from "../Apps_list"

export const Home = () => {

    //function to route to apps
    const handleRouteToApp = (link: string) => {
        window.location.href = `/${link}` 
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-slate-800 w-full flex flex-col justify-center items-center gap-10 text-white py-20 mt-10 rounded-md">
                <div className="text-3xl font-bold">React Test Suite for Apps</div>
                <div className="flex gap-10 flex-wrap">
                    {Apps_list.map((app) => (
                        <div
                        className="flex px-20 py-10 bg-slate-700 rounded-md cursor-pointer hover:bg-slate-600 hover:scale-105 transition-all duration-300"
                        onClick={() => handleRouteToApp(app.link)}
                        >
                            <div className="text-2xl font-bold">{app.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}