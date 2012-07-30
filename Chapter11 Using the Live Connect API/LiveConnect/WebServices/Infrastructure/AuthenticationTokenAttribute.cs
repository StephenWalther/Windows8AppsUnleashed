using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Configuration;
using JWTSample;

namespace WebServices.Infrastructure
{
    public class AuthenticationTokenAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            // Get the Windows Live authentication token from header
            string authenticationToken = null;
            try {
                authenticationToken = actionContext.Request.Headers.GetValues("authenticationToken").FirstOrDefault();
            }
            catch {
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            }

            // Load client secret from Web.config
            var clientSecret = WebConfigurationManager.AppSettings["CLIENT_SECRET"];
            if (String.IsNullOrWhiteSpace(clientSecret)) {
                throw new Exception("Missing Client Secret for Authentication");
            }

            // Validate token
            var d = new Dictionary<int, string>();
            d.Add(0, clientSecret);
            try {
                var myJWT = new JsonWebToken(authenticationToken, d);
            }
            catch {
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            }
        }
    }
}