using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class NDIAzureTableController : ApiController
    {
        private static CloudStorageAccount _storageAccount;
        private static CloudTableClient _tableClient;
        private static CloudTable _table;
        private static TableOperation _retrieveOperation;
        private static TableOperation _updateOperation;


        static NDIAzureTableController()
        {
            _storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            _tableClient = _storageAccount.CreateCloudTableClient();
            _table = _tableClient.GetTableReference("ndiparams");
            _retrieveOperation = TableOperation.Retrieve("VidParams", "LastVideo");
            
        }

        [Route("api/ndiparam")]
        public string Get()
        {
            dynamic result = _table.Execute(_retrieveOperation).Result;
            return result["VideoCode"].StringValue;
        }

        [Route("api/ndiparam/update/{video}")]
        public int PutVideo(string video)
        {
            var entity = new DynamicTableEntity("VidParams", "LastVideo") { ETag = "*" };
            entity.Properties["VideoCode"] = new EntityProperty(video);
            _updateOperation = TableOperation.Replace(entity);

            dynamic result = _table.Execute(_updateOperation).Result;
            return result.Properties.Count;
        }
    }
}