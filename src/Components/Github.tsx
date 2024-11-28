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


    const apiKey = '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';
    
    // {
    //     "url": "https://api.github.com/users/kp019?username=USERNAME",
    //     "status": 200,
    //     "headers": {
    //       "cache-control": "private, max-age=60, s-maxage=60",
    //       "content-type": "application/json; charset=utf-8",
    //       "etag": "W/\"a5c495bff6b46e55ff07116c996ed3b99960c8a28d9ae739ada82c3765f9efb4\"",
    //       "last-modified": "Mon, 21 Oct 2024 12:55:04 GMT",
    //       "x-accepted-oauth-scopes": "",
    //       "x-github-media-type": "github.v3; format=json",
    //       "x-github-request-id": "BFC0:2DC384:31C5BF:358E79:674449AE",
    //       "x-oauth-scopes": "delete_repo, repo, user",
    //       "x-ratelimit-limit": "5000",
    //       "x-ratelimit-remaining": "4994",
    //       "x-ratelimit-reset": "1732529422",
    //       "x-ratelimit-resource": "core",
    //       "x-ratelimit-used": "6"
    //     },
    //     "data": {
    //       "login": "Kp019",
    //       "id": 83325930,
    //       "node_id": "MDQ6VXNlcjgzMzI1OTMw",
    //       "avatar_url": "https://avatars.githubusercontent.com/u/83325930?v=4",
    //       "gravatar_id": "",
    //       "url": "https://api.github.com/users/Kp019",
    //       "html_url": "https://github.com/Kp019",
    //       "followers_url": "https://api.github.com/users/Kp019/followers",
    //       "following_url": "https://api.github.com/users/Kp019/following{/other_user}",
    //       "gists_url": "https://api.github.com/users/Kp019/gists{/gist_id}",
    //       "starred_url": "https://api.github.com/users/Kp019/starred{/owner}{/repo}",
    //       "subscriptions_url": "https://api.github.com/users/Kp019/subscriptions",
    //       "organizations_url": "https://api.github.com/users/Kp019/orgs",
    //       "repos_url": "https://api.github.com/users/Kp019/repos",
    //       "events_url": "https://api.github.com/users/Kp019/events{/privacy}",
    //       "received_events_url": "https://api.github.com/users/Kp019/received_events",
    //       "type": "User",
    //       "user_view_type": "public",
    //       "site_admin": false,
    //       "name": "Krishnaprasad",
    //       "company": null,
    //       "blog": "",
    //       "location": null,
    //       "email": null,
    //       "hireable": null,
    //       "bio": null,
    //       "twitter_username": null,
    //       "public_repos": 50,
    //       "public_gists": 0,
    //       "followers": 29,
    //       "following": 18,
    //       "created_at": "2021-04-28T03:30:24Z",
    //       "updated_at": "2024-10-21T12:55:04Z"
    //     }
    //   }

    
    const getUser = async () => {

        try {
            const octokit = new Octokit({
                auth: apiKey
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
