<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="payforSMS.aspx.cs" Inherits="Hitec.BB.TrackMaster.AspxPages.payforSMS" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>PAY ONILE</title>
    <script type="text/javascript">

        function callitrept() {
            alert("check");
            document.getElementById("btnSubmit").click();
        }
    </script>
</head>
<body onload="callitrept()">
    <form id="form1" runat="server">
    <div>
        <asp:Panel ID="hide" runat="server">
            <table>
                <tr>
                    <td colspan="2">
                        <asp:Button ID="btnSubmit" runat="server" PostBackUrl="https://www.ccavenue.com/shopzone/cc_details.jsp"
                        OnClick="btnSubmit_Click" Style="border: none; background-color: White" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:HiddenField ID="Merchant_Id" runat="server" />
                        <asp:HiddenField ID="encRequest" runat="server" />
                       
                    </td>
                </tr>
            </table>
        </asp:Panel>
    </div>
    </form>
</body>
</html>
