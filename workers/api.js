addEventListener("fetch", (event) => {
    event.respondWith(
      handleRequest(event.request).catch(
        (err) => new Response(err.stack, { status: 500 })
      )
    );
  });
  
  async function gatherResponse(response) {
    return response.text()
  }
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const { pathname } = url;
    const { searchParams } = url;
  
    if (pathname.startsWith("/api/get/aral")) {
      let id = searchParams.get('id')
  
      const init = {
        cf: {
          cacheTtl: 120,
          cacheEverything: true
        },
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Host": "api.tankstelle.aral.de",
          "Origin": "https://tankstelle.aral.de"
        }
      }
      const response = await fetch(`https://api.tankstelle.aral.de/api/v2/stations/${id}/prices`, init)
      const results = await gatherResponse(response)
      return new Response(results, {
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "application/json",
          "Cache-Control": "max-age=120"
        },
        status: 200
      });
    }
  
    if (pathname.startsWith("/api/get/star")) {
      let id = searchParams.get('id')
  
      const init = {
        cf: {
          cacheTtl: 120,
          cacheEverything: true
        },
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Host": "uberall.com",
          "Origin": "https://www.star.de"
        }
      }
      const response = await fetch(`https://uberall.com/api/storefinders/fh6bkacXrYxFxK28kbylc8jdborIlY/locations/${id}`, init)
      const results = await gatherResponse(response)
      return new Response(results, {
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "application/json",
          "Cache-Control": "max-age=120"
        },
        status: 200
      });
    }
  
    if (pathname.startsWith("/api/ping")) {
      return new Response("pong", { 
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "text/html",
          "Cache-Control": "max-age=120"
        },
        status: 200 
      });
    }
  
    const { status } = {
      status: "missing request"
    }
    return new Response(status, { status: 401 });
  };