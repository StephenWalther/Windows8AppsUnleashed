using System;
using Newtonsoft.Json;

namespace DataSources.WebServices.Models
{
    public class Task
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("dateCreated")]
        public DateTime DateCreated { get; set; }
    }
}