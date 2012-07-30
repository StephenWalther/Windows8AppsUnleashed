using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using JWTSample;
using WebServices.Infrastructure;

namespace WebServices.Controllers
{
    public class TasksController : ApiController
    {
        const int MAX_ITEMS = 300;
        const int MIN_ITEMS = 10;

        private DataContext _db = new DataContext();


        [HttpGet]
        [AuthenticationToken]
        public int GetCount() {
            return _db.Tasks.Count();
        }


        [HttpGet]
        [AuthenticationToken]
        public object ItemsFromIndex(int requestIndex, int countBefore, int countAfter)
        {
            // Get the user id
            var authenticationToken = Request.Headers.GetValues("authenticationToken").FirstOrDefault();
            var clientSecret = WebConfigurationManager.AppSettings["CLIENT_SECRET"];
            var d = new Dictionary<int, string>();
            d.Add(0, clientSecret);
            var myJWT = new JsonWebToken(authenticationToken, d);
            var user = myJWT.Claims.UserId;


            var startIndex = Math.Max(0, requestIndex - countBefore);
            var takeCount = Math.Max(MIN_ITEMS, Math.Min(MAX_ITEMS - countBefore, countAfter));

            var tasks = _db.Tasks
                .OrderBy(t => t.Id)
                .Skip(startIndex)
                .Take(takeCount).ToList();

            return new {
                items = tasks,
                offset = startIndex,
                totalCount = tasks.Count()
            };

        }



    }
}