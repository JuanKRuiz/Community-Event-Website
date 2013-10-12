using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
using System.Configuration;

[assembly: OwinStartup(typeof(WebApplication1.Startup))]

namespace WebApplication1
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var servBusConnString = ConfigurationManager.AppSettings["AzureServiceBusCS"];

            GlobalHost.DependencyResolver.UseServiceBus(servBusConnString, "ndi-speakings");

            var ia = app.MapSignalR();
        }
    }
}
