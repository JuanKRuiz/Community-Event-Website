using Microsoft.AspNet.SignalR;
using System.Configuration;

namespace WebApplication1
{
    public class YoutubeHangoutHub : Hub
    {
        public void Update(string videoID, string adminPassword)
        {
            if (adminPassword == ConfigurationManager.AppSettings["EasyPassword"])
            {
                Clients.All.updateHangOut(videoID);
            }
        }
    }
}