<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Maps.aspx.cs" Inherits="Maps" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Local Stores Near You</title>
    <style>
        html, body, #map-canvas, div {
            height: 100%;
            width: 100%;
            margin: 0px;
            padding: 0px;
        }
    </style>
    <script src="js/geolocation.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places,visualization" type="text/javascript"></script>
</head>
<body onload="initialize()" onunload="GUnload()">
    <form id="form1" runat="server">
        <asp:Panel ID="Panel1" runat="server">
            <div id="map-canvas"></div>
        </asp:Panel>
    </form>
</body>
</html>
