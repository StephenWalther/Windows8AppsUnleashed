using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace DataSources.WebServices
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "TasksGetCount",
                routeTemplate: "api/tasks/getCount",
                defaults: new { controller="tasks", action="getCount" }
            );

            routes.MapHttpRoute(
                name: "TasksItemsFromIndex",
                routeTemplate: "api/tasks/itemsFromIndex",
                defaults: new { controller = "tasks", action = "itemsFromIndex" }
            );

            routes.MapHttpRoute(
                name: "TasksInsertAtEnd",
                routeTemplate: "api/tasks/insertAtEnd",
                defaults: new { controller = "tasks", action = "insertAtEnd" }
            );

            routes.MapHttpRoute(
                name: "TasksRemove",
                routeTemplate: "api/tasks/remove/{key}",
                defaults: new { controller = "tasks", action = "remove" }
            );

            routes.MapHttpRoute(
                name: "TasksNuke",
                routeTemplate: "api/tasks/nuke",
                defaults: new { controller = "tasks", action = "nuke" }
            );

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}