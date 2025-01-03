
# Secure Transmission of CSRF Tokens

CSRF tokens are secrets and should be handled securely throughout their lifecycle. Below are guidelines for transmitting CSRF tokens safely.

## Secure Transmission of CSRF Tokens

### Using Hidden HTML Form Fields

The recommended way to transmit CSRF tokens is through hidden HTML form fields, particularly using the `POST` method. This ensures the token is included as a request parameter when the form is submitted.

- Place the field containing the CSRF token as early as possible within the HTML file.
- Position the CSRF token field before any non-hidden fields and before any places where user-controllable data is embedded. This mitigates the risk of attackers using crafted data to manipulate the HTML document and capture its content.

#### Example

```html
<form action="/transfer.do" method="post">
  <input type="hidden" name="CSRFToken" value="OWY4NmQwODE4ODRjN2Q2NTlhMmZlYWEwYzU1YWQwMTVhM2JmNGYxYjJiMGI4MjJjZDE1ZDZMGYwMGEwOA==">
  [...]
</form>
```

### Avoid Transmitting CSRF Tokens in Query Strings

Placing CSRF tokens in the URL query string is less secure because:

- **Logging**: Query strings are logged in various locations (client and server-side).
- **HTTP Referer Header**: Tokens in query strings can be transmitted to third parties within the HTTP Referer header.
- **Browser Display**: Query strings may be displayed on-screen within the user’s browser.

### Using Custom HTTP Headers

To enhance security against attackers who might predict or capture another user’s token, consider inserting the CSRF token into a custom HTTP request header via JavaScript. This method is particularly well-suited for AJAX or API endpoints.

- **Browser Restriction**: Browsers typically block cross-domain requests with custom headers, adding an additional layer of protection.
- **Limitations**: This approach restricts CSRF-protected requests to those using XMLHttpRequest (XHR) or the Fetch API and may be overly complex for simpler scenarios.

## Best Practices

- **Never Transmit CSRF Tokens in Cookies**: Transmitting tokens in cookies can expose them to unnecessary risks.
- **Always Validate Tokens**: Ensure that server-side validation of the CSRF token is performed for every incoming request.

By adhering to these practices, you can significantly reduce the risk of CSRF attacks on your application.
