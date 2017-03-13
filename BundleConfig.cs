﻿using System.Web;
using System.Web.Optimization;

namespace NgCrud
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/styles.css",
                      "~/Content/ui-bootstrap-csp.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-resource.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                 "~/Scripts/app/order-controller.js",
                 "~/Scripts/app/supplier-controller.js",
                 "~/Scripts/app/product-controller.js",
                "~/Scripts/app/customer-controller.js"
                ));

        }
    }
}