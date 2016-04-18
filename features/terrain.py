from lettuce import *
from selenium import webdriver
import time


@world.absorb
def open_firefox():
    world.browser = webdriver.Chrome()
    world.browser.implicitly_wait(30)
    world.base_url = "http://127.0.0.1:5000/reportgen/"
    world.verificationErrors = []
    world.accept_next_alert = True

@world.absorb
def close_firefox():
    world.browser.quit()


@before.each_scenario
def launch_a_new_browser(feature):
    world.open_firefox()
    world.browser.get(world.base_url)

@after.each_scenario
def close_the_browser(feature):
    time.sleep(2)
    world.close_firefox()
