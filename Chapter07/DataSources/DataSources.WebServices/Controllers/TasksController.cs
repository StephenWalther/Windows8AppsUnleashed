using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataSources.WebServices.Infrastructure;
using DataSources.WebServices.Models;

namespace DataSources.WebServices.Controllers
{
    public class TasksController : ApiController
    {
        const int MAX_ITEMS = 300;
        const int MIN_ITEMS = 10;

        private DataContext _db = new DataContext();

        [HttpGet]
        public int GetCount() {
            return _db.Tasks.Count();
        }


        [HttpGet]
        public object ItemsFromIndex(int requestIndex, int countBefore, int countAfter)
        {
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


        [HttpPost]
        public Task InsertAtEnd(Task taskToInsert) {
            taskToInsert.DateCreated = DateTime.Now;
            _db.Tasks.Add(taskToInsert);
            _db.SaveChanges();

            return taskToInsert;
        }

        [HttpDelete]
        public bool Remove(string key)
        {
            var id = int.Parse(key);
            _db.Tasks.Remove(_db.Tasks.Find(id));
            _db.SaveChanges();
            return true;
        }



        [HttpDelete]
        public bool Nuke() {
            while (_db.Tasks.Any()) {
                _db.Tasks.Remove(_db.Tasks.First());
                _db.SaveChanges();
            }

            return true;
        }



    }
}