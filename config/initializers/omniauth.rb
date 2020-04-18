Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, "451929393947-9lmjv00khudl3p0ua1du5mhb6ugfnedn.apps.googleusercontent.com", "GZTBqo41cGuyQDe3zaFsUsAB", skip_jwt: true
  end