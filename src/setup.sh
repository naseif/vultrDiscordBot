#!/bin/bash

## Updating the server and installing xubuntu GUI
apt update
apt upgrade -y
export DEBIAN_FRONTEND=noninteractive
apt-get install xubuntu-core -y

## Installing x2go Server and Firefox
apt-get install x2goserver x2goserver-xsession -y
apt-get install firefox -y

## Dev Environment
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
snap install --classic code
apt-get install gcc g++ make -y


## Setting up the new user and generating random password

clear
useradd developer -d /home/developer -m ;
echo -e "qE0Wmu16lfkju7gtV0\nqE0Wmu16lfkju7gtV0" | passwd developer
usermod --shell /bin/bash developer
usermod -aG sudo developer
