source 'https://rubygems.org'

ruby '2.4.2'

gem 'rails', '5.1.6'                                    # for ruby on rails (vs ruby on sinatra)
gem 'puma', '~> 3.10'                                   # Use Puma as the app server

gem 'pg', '~> 0.21.0'                                   # Postgres gem
gem 'sass-rails', '~> 5.0'                              # Use SCSS for stylesheets
gem 'uglifier', '>= 1.3.0'                              # Use Uglifier as compressor for JavaScript assets
gem 'coffee-rails', '~> 4.2'                            # Use CoffeeScript for .coffee assets and views
gem 'turbolinks', '~> 5'                                # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'jbuilder', '~> 2.5'                                # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'rack-cors', require: 'rack/cors'
# gem 'redis', '~> 4.0'                                 # Use Redis adapter to run Action Cable in production
# gem 'bcrypt', '~> 3.1.7'                              # Use ActiveModel has_secure_password
# gem 'capistrano-rails', group: :development           # Use Capistrano for deployment

group :development, :test do
  gem 'byebug', '~> 10.0.2'
  gem 'capybara', '~> 2.13'
  gem 'faker', '~> 1.9'
  gem 'rspec-rails', '~> 3.7.1'
  gem 'factory_bot_rails', '4.10.0'
  gem 'awesome_print', '~> 1.8'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'database_cleaner', '~> 1.6.2'
  gem 'rspec-expectations', '~> 3.7.0'
  gem 'rails-controller-testing', '~> 1.0.2'
  gem 'selenium-webdriver', '~> 3.6.0'
  gem 'simplecov', '~> 0.16.1', require: false
  gem 'shoulda-matchers', '~> 3.1.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]