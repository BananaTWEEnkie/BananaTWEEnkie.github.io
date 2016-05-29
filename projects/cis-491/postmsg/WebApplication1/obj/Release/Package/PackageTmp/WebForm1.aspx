<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication1.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        This is a demo for postMessage<br />
        <br />
        <asp:TextBox ID="TextBox1" runat="server" Width="474px"></asp:TextBox> <asp:Button text="Click Me Bruh" 
                     OnClick="Click" 
                     runat="server" 
                    ValidationGroup="click"/>

        <br />
        <br />

        <asp:Label ID="Label1" runat="server" Text="Your Message Will Appear Here, You Hacker"></asp:Label>
    </div>
    </form>
</body>
</html>
