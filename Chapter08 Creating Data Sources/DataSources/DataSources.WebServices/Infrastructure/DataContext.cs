using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DataSources.WebServices.Models;

namespace DataSources.WebServices.Infrastructure
{
    public class DataContext:DbContext
    {

        public DataContext()
        {
            Database.SetInitializer(new DatabaseInitializer());
        }

        public IDbSet<Task> Tasks { get; set; }
    }
}