"use client";
import { useState, useEffect } from "react";

export default function Logger() {
	const [visitors, setVisitors] = useState(0);

	useEffect(() => {
		async function initLogger() {
			const body = {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					clientSecret: "30915014-d96a-4e91-a3b0-2bf68371d97c",
					applicationId: "5c2b0e88-077b-4d6d-b67e-6c7d913156ed",
				}),
			};
			const res = await fetch(
				"https://logger-mocha-six.vercel.app/api/logger/v1",
				body
			);
			const json = await res.json();
			if (res.status === 200) {
				setVisitors(json);
			} else {
				// error
				console.log(json);
			}
		}
		initLogger();
	}, []);
	return (
		
        <div className="w-fit m-auto font-semibold gap-3  text-lg sm:text-xs p-3 sm:p-2 rounded-md shadow-md z-50">
        Alunos online: <span className="text-green-600"> {visitors} </span>
      </div>
    //     <div className="w-fit m-auto  bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-xs p-3 sm:p-2 rounded-md shadow-lg z-50">
    //     Visitors: {visitors}
    //   </div>
	);
}
