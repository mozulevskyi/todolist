source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.4.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1'
gem 'pg', '~> 0.21.0'                 # Postgres gem
gem 'puma', '~> 3.11'                 # Use Puma as the app server
gem 'sass-rails', '~> 5.0'            # Use SCSS for stylesheets
gem 'uglifier', '>= 1.3.0'            # Use Uglifier as compressor for JavaScript assets
gem 'webpacker', '~> 3.5', '>= 3.5.5' # Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'apipie-rails', '~> 0.5.13'
gem 'turbolinks', '~> 5'              # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'jbuilder', '~> 2.5'              # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'bootsnap', '>= 1.1.0', require: false  # Reduces boot times through caching; required in config/boot.rb
gem 'coffee-rails', '~> 4.2', '>= 4.2.2'

group :development, :test do
  gem 'byebug', '~> 10.0.2'
  gem 'capybara', '~> 2.13'
  gem 'faker', '~> 1.9'
  gem 'rspec-rails', '~> 3.7.1'
  gem 'factory_bot_rails', '4.10.0'
  gem 'awesome_print', '~> 1.8'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :test do
  gem 'database_cleaner', '~> 1.6.2'
  gem 'rspec-expectations', '~> 3.7.0'
  gem 'rails-controller-testing', '~> 1.0.2'
  gem 'selenium-webdriver', '~> 3.6.0'
  gem 'simplecov', '~> 0.16.1', require: false
  gem 'shoulda-matchers', '~> 3.1.2'
end

group :production do
  gem 'rails_12factor', '~> 0.0.3'                      # Helps speed up deploys on heroku
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
