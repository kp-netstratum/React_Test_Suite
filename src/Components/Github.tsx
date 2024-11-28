import { Octokit } from "octokit";
import { useState } from "react";

interface GithubUser  {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

export const Github = () => {

    const [username, setUsername] = useState<string>('');
    const [repos, setRepos] = useState<GithubUser | null>(null);

    
    const getUser = async () => {

        try {
            const octokit = new Octokit({
                // auth: apiKey
              })
        
            const response = await octokit.request(`GET /users/${username}`, {
              username: 'USERNAME',
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            })
            // console.log(response)
            setRepos(response.data) 
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
            <h1 className="text-3xl font-bold">Github</h1>
            <div className="flex flex-col gap-5">
                <div>
                    <input className="text-black" type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                    <button
                    onClick={() => {getUser()}}
                    >get user</button>
                </div>
                <div>
                    {repos && (
                        <div>
                            <div>{repos?.name}</div>
                            <div>{repos?.public_repos}</div>
                            <div>{repos?.public_gists}</div>
                            <div>{repos?.followers}</div>
                            <div>{repos?.following}</div>
                            <div>{repos?.created_at}</div>
                            <div>{repos?.updated_at}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
