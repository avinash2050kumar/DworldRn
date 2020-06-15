import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import {Screen} from '../theme/styledComponent';
import styled from 'styled-components';

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export default class PrivacyPolicy extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Privacy and Policy',
    };
  };

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Screen><Text>{`1.\tD-World respects your privacy and recognizes the need to protect your personal information (any information by which you can be identified, such as name, address, financial information, and telephone number) you share with us. We would like to assure you that we follow appropriate standards when it comes to protecting your privacy on our web sites and applications.

2.\tIn general, you can not visit D-World without telling us who you are or revealing any personal information about yourself. We track the Internet address of the domains from which people visit us and analyze this data for trends and statistics, but the individual user remains anonymous.

3.\tPlease note that our Privacy Policy forms part of our Terms and conditions available at App Name]

4.\tA transaction on D-World is to be conducted by persons above the age of 18 years only. If you are under 18 years of age, parental consent will be required for you to use our services. 

5.\tWe may collect your personal data when you:
a) create an account with us or
b) otherwise provide us with your personal data or
c) use of any related services connected to D-World or
d) complete contact forms or request newsletters or other information from us (ex: email)

6.\tWhen you access D-World, we will automatically collect your device data, which may include

a) browser type
b) IP address
c) language
d) operating system
e) cookies and the ID and location of your device
f) the state or country from which you accessed D-World
g) the pages/videos you view
h) length of time spent on pages/videos
i) the services you use and the manner in which you use such services (e.g., the content you access, view, click on, search for, transact etc.)
j) the date and time of your visit
k) metadata, logs files, error logs
l) other geographic and demographic information; and
m) other hardware and software information.
n) which pop up or push messages you might have seen and responded to
This computer data is collected for analysis and evaluation in order to help us improve D-World, the services we provide and to enhance your experience by providing you with better services and benefits that you shall be entitled to.

7.\tTo the extent that such computer data is maintained in a manner that identifies your name or contact information, it will be treated as personal data; otherwise, such computer data will be treated as non-personal data.

8.\tThe personal data we collect from you will be used, or shared with third parties (including related companies and third party service providers), for some or all of the following purposes:

a. creating or maintaining any account or profile you may have with us
b. to track your activity on D-World
c. verifying and carrying out financial transactions in relation to any payments or transfers you make
d. carrying out research and analytics on our users’ demographics and behaviour
e. to personalise and/tailor any communications that we may send you and provide you with products, services or information we think you may find useful or which you have requested from us or have expressed an interest in
f. to personalise and enhance user experience
g. determining and verifying your eligibility for certain marketing or transaction events and other features of D-World
h. enforcing our terms of use; and/or
i. communicating with you in relation to your account and alerting you to the latest developments
j. to enable us to administer any competitions or other offers/promotions which you enter into for fraud screening and prevention purposes.

9.\t When you register an account or otherwise provide us with your personal data, we may also use the personal data to send to you marketing and/or promotional materials about us and our services from time to time. You can unsubscribe from receiving the marketing information at any time by using the unsubscribe function within the electronic marketing material.

10.\tIn order to provide our products and services to you or to otherwise fulfil contractual arrangements that we have with you, we may need to appoint other organisations to carry out some of the data processing activities on our behalf. These may include, for example, payment processing organisations, delivery organisations, fraud prevention and screening and credit risk management companies, and mailing houses.

11.\tWe may share your data with advertising networks and/or social media platforms for the purposes of selecting and serving relevant adverts to you via those networks/platforms, and to search engine and analytics providers.


12.\tD-World and its services may contain links to third-party websites, including identity verification and social networking websites. Your use of these features may result in the collection or sharing of information about you, depending on the feature. Please be aware that we are not responsible for the content or privacy practices of other websites or services to which we link. We do not endorse or make any representations about third-party websites or services. The personal data you choose to provide to or that is collected by these third parties is not covered by our Privacy Statement. We strongly encourage you to read such third parties’ privacy statements.

13.\tWe may share:

(A) your personal data with any person or entity where we believe in good faith that such disclosure is necessary to:

(i) comply with the law or in response to a subpoena, court order, government request, or other legal process.
(ii) produce relevant documents or information in connection with litigation, arbitration, mediation, adjudication, government or internal investigations, or other legal or administrative proceedings;
(iii) protect the interests, rights, safety, or property of D-World or others;
(iv) otherwise as permitted under applicable law.
(B) personal data about our visitors, customers, or former customers with the following types of companies that perform services on our behalf or with whom we have joint marketing agreements:

(i) Non-financial companies such as envelope stuffers, fulfilment service providers, payment processors, data processors, customer/support services, etc., and/or
(ii) Financial service providers such as companies engaged in banking/payments/facilitating financial transactions.
14.\tIn sharing your personal data with such parties, we will reasonably endeavour to ensure that the third parties and our affiliates keep your personal data secure from unauthorised access, collection, use, disclosure, or similar risks and retain your personal data only for as long as they need your personal data to achieve the abovementioned purposes.

15.\tYou acknowledge that, notwithstanding this Privacy Policy, we have at all times the right to disclose your personal data to any legal, regulatory, governmental, tax, law enforcement or other authorities pursuant to applicable law and our legal obligations. This may arise from any investigation, order, or request by such parties. To the furthest extent permissible by law, you agree not to take any action and/or waive your rights to take any action against us for the disclosure of your personal data in these circumstances.

16.\tIf any disclosure of your personal data involves the transfer of your personal data by D-World out of India, we will take steps to reasonably ensure that the receiving jurisdiction has in place a standard of protection accorded to personal data that is comparable to the protection under India’s data protection laws.

17.\tWe have implemented reasonable security arrangements including physical, administrative, technical, and electronic security measures to protect against the loss, misuse, and alteration of your personal data. Despite our best efforts, however, no security measures are perfect or impenetrable. In the event where you believe your privacy has been breached, please contact us immediately.

18.\tIt is your responsibility to protect any passwords you require to access your account, on D-World. Please use unique numbers, letters and special characters, and do not share your password with anyone. If you do share your password with others, you will be responsible for all actions taken in the name of your account and the consequences. If you lose control of your password, you may lose substantial control over your personal data and other information submitted to us. You could also be subject to legally binding actions taken on your behalf. Therefore, if your password has been compromised for any reason or if you have grounds to believe that your password has been compromised, you should immediately contact us and change your password.

19.\tYou undertake to treat your password and other confidential information in relation to the use of D-World and its services confidentially, and we disclaim any liability arising from your failure to do so.

20.\tSome of our web pages use "cookies" so that we can better serve you with customized information when you return to our site. Cookies are identifiers which a web site can send to your browser to keep on your computer to facilitate your next visit to our site. You can set your browser to notify you when you are sent a cookie, giving you the option to decide whether or not to accept it. The information we collect and analyze is used to improve our service to you. Please note, if you refuse cookies this may mean that you can’t use some of the additional features of our website and may not be able to access certain parts of the website.

21.\tYou may update any of your personal data we possess by contacting us at D-World.com and we will endeavour to serve your request for updation. 

22.\tYou may communicate your objection to our continual use and/or disclosure of your personal data for any of the purposes and in the manner as stated above at any time by contacting us at D-World.com.

23.\tIf you do not wish for us to continue using your information, and/or disclose your personal data for any of the purposes and in the manner as stated above at any time, you may opt out of providing the same by contacting us at D-World.com. 
24.\tWe retain personal data only for as long as necessary to provide the services you have requested and thereafter for a variety of legitimate legal or business purposes. These might include retention periods:

a. mandated by law, contract or similar obligations applicable to our business operations;
b. for preserving, resolving, defending or enforcing our legal/contractual rights; or needed to maintain adequate and accurate business and financial records.

25.\tIf our privacy policy changes in the future, it will be posted here and a new effective date will be shown. You should access our privacy policy regularly to ensure you understand our current policies. Please reference the privacy policy in your subject line. D-World will attempt to respond to all reasonable concerns or inquiries within 30 business days of receipt.
`}</Text>

        </Screen>
      </ScrollView>
    );
  }
}
