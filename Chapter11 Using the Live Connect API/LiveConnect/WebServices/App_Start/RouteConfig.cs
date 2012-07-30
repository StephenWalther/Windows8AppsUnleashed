using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebServices
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "TasksGetCount",
                routeTemplate: "api/tasks/getCount",
                defaults: new { controller = "tasks", action = "getCount" }
            );

            routes.MapHttpRoute(
                name: "TasksItemsFromIndex",
                routeTemplate: "api/tasks/itemsFromIndex",
                defaults: new { controller = "tasks", action = "itemsFromIndex" }
            );

        }
    }
}