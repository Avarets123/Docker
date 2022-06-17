
export const fetchWithAuthenticated = async (param: string = '', token: string, data: any = null, dinParam: string = '', method: any = null) => {


    if (!data) {

        const req = await fetch('api/' + param + dinParam, {
            method: method ?? 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        })



        if (!req.ok) {
            return req.status;
        }

        const res = await req.json();

        return res;


    }


    const req = await fetch('api/' + param + dinParam, {
        method: method ?? 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(data)
    });


    if (!req.ok) {
        return req.status;
    }

    const res = await req.json();

    return res

}