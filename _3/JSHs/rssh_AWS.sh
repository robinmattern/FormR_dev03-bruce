#!/bin/sh

# aSSH=~/.ssh
  aPEM=id_rsa_Bruce-FormR_robinmattern@github.com_v01103.pem
# aPEM=bt218d_ghub_FormR_Bruce-id_rsa_\(13-57-57-151\)_robinmattern@github.com_v01103.pem
  aURL=ubuntu@ec2-13-57-57-151.us-west-1.compute.amazonaws.com

  aSSH=/C/WEBs/SCN2/Files/VMs/sc216/home/ubuntu/.ssh
  aPEM=sc216_FormR-KeyPair.pem
  aPEM=sc216d-ub18_FormR-Dev01_AWS-KeyPair_\(13.57.57.151\)_root_v01228.pem
  aURL=ubuntu@ec2-13-57-57-151.us-west-1.compute.amazonaws.com

# aPEM=sc216d-ub18_FormR-Dev01_AWS-KeyPair_\(54.193.121.66\)_root_v01228.pem

  echo ""
  echo ssh -i  {aSSH}/${aPEM}  ${aURL}
       ssh -i ${aSSH}/${aPEM}  ${aURL}
  echo ""


# 1x@AHU_#r8g4KSj3


# URL: https://my.vultr.com/subs/?id=f621b157-ca00-46ce-86b8-c631432d2838
# UID: bruce.troutman@gmail.com
# PWD: Washington!12345


# mysql -u admin -p
#    password: Washington!12345



