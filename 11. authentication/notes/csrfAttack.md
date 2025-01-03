# **Cross-Site Request Forgery (CSRF) Attack**

## **What is CSRF?**

Cross-Site Request Forgery (CSRF), also known as XSRF, Sea Surf, or Session Riding, is an attack vector that tricks a web browser into executing an unwanted action in an application where a user is logged in.

A successful CSRF attack can be devastating for both the business and the user. It can result in:
- Damaged client relationships
- Unauthorized fund transfers
- Changed passwords
- Data theft, including stolen session cookies

### **How CSRF Works**

CSRF attacks are typically conducted using malicious social engineering, such as an email or link that tricks the victim into sending a forged request to a server. Since the user is authenticated at the time of the attack, the server cannot distinguish between a legitimate request and a forged one.

---

## **CSRF Example**

Before launching an attack, an attacker often studies an application to create a forged request that appears legitimate.

### Example: Bank Transfer

A legitimate GET request for a $100 transfer might look like this:
```http
GET http://netbank.com/transfer.do?acct=PersonB&amount=$100 HTTP/1.1
```

An attacker can modify it to transfer $100 to their own account:
```http
GET http://netbank.com/transfer.do?acct=AttackerA&amount=$100 HTTP/1.1
```

They can embed this malicious request into an innocent-looking hyperlink:
```html
<a href="http://netbank.com/transfer.do?acct=AttackerA&amount=$100">Read more!</a>
```

The attacker distributes this hyperlink via email. Users who click the link while logged into their bank account will unknowingly initiate the transfer.

### Example: Using a `<form>` Tag

If the application uses POST requests, the attacker can deliver the malicious request through an auto-submitting form:

```html
<body onload="document.forms[0].submit()">
  <form action="http://netbank.com/transfer.do" method="POST">
    <input type="hidden" name="acct" value="AttackerA"/>
    <input type="hidden" name="amount" value="$100"/>
    <input type="submit" value="View my pictures!"/>
  </form>
</body>
```

---

## **Methods of CSRF Mitigation**

### **Best Practices for Users**
- Log off web applications when not in use.
- Secure usernames and passwords.
- Avoid allowing browsers to remember passwords.
- Do not browse other websites while logged into sensitive applications.

### **Best Practices for Web Applications**

#### **Using Unique Tokens**
- Generate unique random tokens for every session or request.
- Verify these tokens on the server side.
- Block requests with duplicate tokens or missing values.

#### **Double Submission of Cookies**
- Assign random tokens to both a cookie and a request parameter.
- Verify on the server that the tokens match before granting access.

#### **Limitations of Tokens**
While effective, tokens can be exposed through:
- Browser history
- HTTP log files
- Network appliances logging HTTP requests
- Referrer headers if the site links to external URLs

---

## **Using Custom Rules to Prevent CSRF**

Due to the highly individual nature of CSRF attacks, custom security policies can be created to address specific scenarios.

### **Example: Using IncapRules**
- IncapRules, the Imperva cloud proprietary custom rules engine, allows customers to create their own security policies.
- These policies use intuitive syntax and can be updated dynamically.

#### **Filter Requests**
- Filter requests to sensitive pages and functions based on the HTTP referrer header content.
- Allow execution of requests only from a secure list of domains.

This approach mitigates the social engineering aspect of CSRF attacks by preventing execution of malicious requests outside a security perimeter.

#### **Alert Mode and CAPTCHAs**
- Use ‘Alert Only’ mode to track possible exploit attempts.
- Present CAPTCHAs to alert and protect unwary users.

---

## **Learn More**

Explore how the **Imperva Web Application Firewall** can help mitigate CSRF attacks:

- **Request a demo**
- **Read more about CSRF prevention methods**
