// auth.js
if (!window.Pages) window.Pages = {};

window.Pages.auth = {
  title: {
    en: "Authentication Flow",
    ar: "شاشات تسجيل الدخول"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      badge: "خيركم خيركم لأهله",
      
      loginTitle: isAr ? "مرحباً بك مجدداً" : "Welcome back",
      loginDesc: isAr ? "سجل الدخول إلى حسابك التعليمي والمجتمعي." : "Sign in to your learning & community account.",
      email: isAr ? "عنوان البريد الإلكتروني" : "Email Address",
      pwd: isAr ? "كلمة المرور" : "Password",
      forgot: isAr ? "نسيت كلمة المرور؟" : "Forgot password?",
      keep: isAr ? "إبقاء تسجيل دخولي نشطاً" : "Keep me signed in",
      signIn: isAr ? "تسجيل الدخول" : "Sign In",
      noAcc: isAr ? "ليس لديك حساب؟" : "Don't have an account?",
      signUp: isAr ? "أنشئ حساباً جديداً" : "Sign up",

      regTitle: isAr ? "إنشاء حساب جديد" : "Create account",
      regDesc: isAr ? "انضم إلى منصتنا القيمية الرائدة اليوم." : "Join our premium values-driven platform today.",
      name: isAr ? "الاسم الكامل" : "Full Name",
      choosePwd: isAr ? "اختر كلمة مرور قوية" : "Choose a strong password",
      acceptTerms: isAr ? "أوافق على شروط الخدمة وسياسة الخصوصية" : "I accept the Terms of Service & Privacy Policy",
      createAcc: isAr ? "إنشاء الحساب" : "Create Account",
      hasAcc: isAr ? "لديك حساب بالفعل؟" : "Already have an account?",

      forgotTitle: isAr ? "نسيت كلمة المرور" : "Forgot Password",
      forgotDesc: isAr ? "أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة التعيين." : "Enter your email and we'll send a code to reset password.",
      sendReset: isAr ? "إرسال رمز إعادة التعيين" : "Send Reset Code",
      backToSign: isAr ? "العودة إلى" : "Go back to",

      otpTitle: isAr ? "رمز التحقق" : "Verification Code",
      otpDesc: isAr ? "لقد أرسلنا رمز تحقق مكوناً من 6 أرقام إلى بريدك الإلكتروني." : "We've sent a 6-digit verification code to your email.",
      verifyCode: isAr ? "التحقق من الرمز" : "Verify Code",
      noOtp: isAr ? "لم تستلم الرمز؟" : "Didn't receive code?",
      resend: isAr ? "إعادة الإرسال" : "Resend",

      resetTitle: isAr ? "إعادة تعيين كلمة المرور" : "Reset Password",
      resetDesc: isAr ? "اختر كلمة مرور جديدة وآمنة لحسابك." : "Choose a new, secure password for your account.",
      newPwd: isAr ? "كلمة المرور الجديدة" : "New Password",
      confirmPwd: isAr ? "تأكيد كلمة المرور" : "Confirm Password"
    };

    return `
      <div style="display:flex; justify-content:center; align-items:center; min-height:80vh; padding:var(--space-4);">
        
        <!-- Auth Card -->
        <div id="authCard" class="card card-glass" style="width:100%; max-width:400px; padding:var(--space-6); box-shadow:var(--theme-shadow-xl);">
          
          <!-- Shared Header with Logo -->
          <div style="text-align:center; margin-bottom:var(--space-5);">
            <img src="./assets/logo.png" alt="Khairkom Logo" style="height:48px; object-fit:contain; margin-bottom:12px;">
            <p style="margin:0; font-size:13px; color:var(--theme-text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">${text.badge}</p>
          </div>

          <!-- STATE 1: LOGIN -->
          <div id="authState-login" class="auth-substate">
            <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:800; text-align:center;">${text.loginTitle}</h2>
            <p style="margin:0 0 24px 0; font-size:13px; color:var(--theme-text-muted); text-align:center;">${text.loginDesc}</p>
            
            <div class="form-group">
              <label class="form-label">${text.email}</label>
              <input type="email" class="form-input" id="loginEmail" placeholder="name@example.com" value="student@khairkom.org">
            </div>
            
            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2);">
                <label class="form-label" style="margin-bottom:0;">${text.pwd}</label>
                <a href="#" style="font-size:12px; color:var(--theme-primary); font-weight:600; text-decoration:none;" onclick="Pages.auth.switchState('forgot'); return false;">${text.forgot}</a>
              </div>
              <input type="password" class="form-input" id="loginPassword" placeholder="••••••••" value="password123">
            </div>

            <div class="form-group" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
              <label class="custom-checkbox">
                <input type="checkbox" checked>
                <span class="checkbox-box"></span>
                <span>${text.keep}</span>
              </label>
            </div>

            <button class="btn btn-primary" style="width:100%; margin-bottom:16px;" onclick="Pages.auth.submitLogin()">
              ${text.signIn}
            </button>

            <p style="margin:0; text-align:center; font-size:13px; color:var(--theme-text-muted);">
              ${text.noAcc} <a href="#" style="color:var(--theme-primary); font-weight:700; text-decoration:none;" onclick="Pages.auth.switchState('register'); return false;">${text.signUp}</a>
            </p>
          </div>

          <!-- STATE 2: REGISTER -->
          <div id="authState-register" class="auth-substate" style="display:none;">
            <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:800; text-align:center;">${text.regTitle}</h2>
            <p style="margin:0 0 24px 0; font-size:13px; color:var(--theme-text-muted); text-align:center;">${text.regDesc}</p>
            
            <div class="form-group">
              <label class="form-label">${text.name}</label>
              <input type="text" class="form-input" placeholder="Abdullah Ahmad">
            </div>

            <div class="form-group">
              <label class="form-label">${text.email}</label>
              <input type="email" class="form-input" placeholder="name@example.com">
            </div>
            
            <div class="form-group">
              <label class="form-label">${text.pwd}</label>
              <input type="password" class="form-input" placeholder="${text.choosePwd}">
            </div>

            <div class="form-group" style="margin-bottom:24px;">
              <label class="custom-checkbox">
                <input type="checkbox">
                <span class="checkbox-box"></span>
                <span style="font-size:12px; line-height:1.4;">${text.acceptTerms}</span>
              </label>
            </div>

            <button class="btn btn-primary" style="width:100%; margin-bottom:16px;" onclick="Pages.auth.switchState('verify')">
              ${text.createAcc}
            </button>

            <p style="margin:0; text-align:center; font-size:13px; color:var(--theme-text-muted);">
              ${text.hasAcc} <a href="#" style="color:var(--theme-primary); font-weight:700; text-decoration:none;" onclick="Pages.auth.switchState('login'); return false;">${text.signIn}</a>
            </p>
          </div>

          <!-- STATE 3: FORGOT PASSWORD -->
          <div id="authState-forgot" class="auth-substate" style="display:none;">
            <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:800; text-align:center;">${text.forgotTitle}</h2>
            <p style="margin:0 0 24px 0; font-size:13px; color:var(--theme-text-muted); text-align:center;">${text.forgotDesc}</p>
            
            <div class="form-group" style="margin-bottom:24px;">
              <label class="form-label">${text.email}</label>
              <input type="email" class="form-input" placeholder="name@example.com">
            </div>

            <button class="btn btn-primary" style="width:100%; margin-bottom:16px;" onclick="Pages.auth.switchState('verify')">
              ${text.sendReset}
            </button>

            <p style="margin:0; text-align:center; font-size:13px; color:var(--theme-text-muted);">
              ${text.backToSign} <a href="#" style="color:var(--theme-primary); font-weight:700; text-decoration:none;" onclick="Pages.auth.switchState('login'); return false;">${text.signIn}</a>
            </p>
          </div>

          <!-- STATE 4: OTP VERIFICATION -->
          <div id="authState-verify" class="auth-substate" style="display:none;">
            <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:800; text-align:center;">${text.otpTitle}</h2>
            <p style="margin:0 0 24px 0; font-size:13px; color:var(--theme-text-muted); text-align:center;">${text.otpDesc}</p>
            
            <div class="form-group" style="display:flex; justify-content:space-between; gap:8px; margin-bottom:24px; flex-direction:row-reverse;">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="2">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="4">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="8">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="3">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="1">
              <input type="text" class="form-input" style="width:48px; height:48px; text-align:center; font-size:20px; font-weight:700; padding:0;" maxlength="1" value="9">
            </div>

            <button class="btn btn-primary" style="width:100%; margin-bottom:16px;" onclick="Pages.auth.switchState('reset')">
              ${text.verifyCode}
            </button>

            <p style="margin:0; text-align:center; font-size:13px; color:var(--theme-text-muted);">
              ${text.noOtp} <a href="#" style="color:var(--theme-primary); font-weight:700; text-decoration:none;" onclick="Components.showToast('${isAr ? "تم إعادة إرسال رمز التحقق!" : "New verification code sent!"}', 'info'); return false;">${text.resend}</a>
            </p>
          </div>

          <!-- STATE 5: RESET PASSWORD -->
          <div id="authState-reset" class="auth-substate" style="display:none;">
            <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:800; text-align:center;">${text.resetTitle}</h2>
            <p style="margin:0 0 24px 0; font-size:13px; color:var(--theme-text-muted); text-align:center;">${text.resetDesc}</p>
            
            <div class="form-group">
              <label class="form-label">${text.newPwd}</label>
              <input type="password" class="form-input" placeholder="At least 8 characters">
            </div>

            <div class="form-group" style="margin-bottom:24px;">
              <label class="form-label">${text.confirmPwd}</label>
              <input type="password" class="form-input" placeholder="Repeat new password">
            </div>

            <button class="btn btn-primary" style="width:100%; margin-bottom:16px;" onclick="Pages.auth.finishReset()">
              ${text.resetTitle}
            </button>
          </div>

        </div>
      </div>
    `;
  },
  init() {},
  switchState(stateName) {
    document.querySelectorAll('.auth-substate').forEach(div => div.style.display = 'none');
    const target = document.getElementById(`authState-${stateName}`);
    if (target) {
      target.style.display = 'block';
      target.style.opacity = '0';
      setTimeout(() => {
        target.style.opacity = '1';
        target.style.transition = 'opacity 0.25s ease';
      }, 50);
    }
  },
  submitLogin() {
    const isAr = App.state.lang === 'ar';
    Components.showToast(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Login Successful!', 'success');
    setTimeout(() => {
      App.navigateTo('dashboard');
    }, 800);
  },
  finishReset() {
    const isAr = App.state.lang === 'ar';
    Components.showToast(isAr ? 'تم تعيين كلمة المرور بنجاح. يمكنك الدخول الآن.' : 'Password reset complete. You can now login.', 'success');
    this.switchState('login');
  }
};
