

export const ADMINAPI = async ({
    body,
    headers = {},
    method,
    signal,
    url,
    formData = false,
    type,
    dispatch,
  }) => {
    let token;
    
    if (!formData) {
      headers["content-type"] = "application/json";
    }
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? (formData ? body : JSON.stringify(body)) : null,
        signal,
        cache: "no-store",
      });
      const responseData = await response.json();
    console.log(responseData,"TTTT");
      if (!response.ok) {
        throw responseData;
      }
    
      return responseData;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };


  export const callAPI = async ({
    body,
    headers = {},
    method,
    signal,
    url,
    formData = false,
    type,
    dispatch,
  }) => {
    let token;
    let accessToken;
    let roleId;
    token = localStorage.getItem("token");
    accessToken = localStorage.getItem("accessToken");
    roleId = localStorage.getItem("roleId");
  
    headers["Token"] = `${token}`;
    headers["Accesstoken"] = `${accessToken}`;
    headers["roleid"] = `${roleId}`;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Authorization"] = `${token}`;
    headers["version"] = 2.0;
    if (!formData) {
      headers["content-type"] = "application/json";
    }
  
    try {
      let fullUrl = BASE_CONFIG.BASE_URL + url;
      const response = await fetch(fullUrl, {
        method,
        headers,
        body: body ? (formData ? body : JSON.stringify(body)) : null,
        signal,
        cache: "no-store",
      });
  
      if (!response.ok) {
        if (response.status === 405) {
          console.log(response);
        }
        const responseData = await response.json();
        throw responseData;
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("error", { ...error });
      throw error;
    }
  };