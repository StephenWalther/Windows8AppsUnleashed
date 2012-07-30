using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebServices.Models;

namespace WebServices.Infrastructure
{
    public class DatabaseInitializer: DropCreateDatabaseAlways<DataContext>
    {
        protected override void Seed(DataContext context)
        {
            var tasks = new List<Task> {
                new Task {Name="Wake up", DateCreated=DateTime.Parse("6:00am")},
                new Task {Name="Get out of bed", DateCreated=DateTime.Parse("6:10am")},
                new Task {Name="Drag the comb across my head", DateCreated=DateTime.Parse("6:30am")}
            };

            tasks.ForEach(t => context.Tasks.Add(t));
        }
    }
}